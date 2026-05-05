import json
import pandas as pd
import logging
from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import ValidationError
from app.schemas.lmi import LMIDataPoint, LMITrendAnalysis

# Initialize logging for the ingestion service
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LMIParser:
    """
    Service class for parsing and normalizing Labour Market Intelligence (LMI) data.
    Handles multiple source formats (JSON, CSV, XML) to provide a unified data structure
    for the predictive analytics engine.
    """

    def __init__(self):
        self.standard_columns = [
            "occupation_code", "occupation_title", "location_id", 
            "median_salary", "job_openings", "growth_rate", "timestamp"
        ]

    def parse_json_source(self, raw_content: str) -> List[LMIDataPoint]:
        """
        Parses raw JSON data from external API providers.
        """
        try:
            data = json.loads(raw_content)
            processed_points = []
            
            # Assuming standard LMI format from provider
            items = data.get("data", []) if isinstance(data, dict) else data
            
            for item in items:
                try:
                    point = LMIDataPoint(
                        occupation_code=item.get("soc_code") or item.get("code"),
                        occupation_title=item.get("title"),
                        location_id=item.get("region_id"),
                        median_salary=float(item.get("salary", 0)),
                        job_openings=int(item.get("vacancies", 0)),
                        growth_rate=float(item.get("projection_rate", 0.0)),
                        timestamp=datetime.utcnow()
                    )
                    processed_points.append(point)
                except (ValidationError, ValueError, TypeError) as e:
                    logger.error(f"Skipping malformed data point: {e}")
                    continue
            
            return processed_points
        except json.JSONDecodeError as e:
            logger.critical(f"Failed to decode LMI JSON: {e}")
            return []

    def parse_csv_source(self, file_path: str) -> List[LMIDataPoint]:
        """
        Parses CSV datasets from government or institutional archives.
        """
        try:
            df = pd.read_csv(file_path)
            # Normalize column names to lowercase/snake_case
            df.columns = [c.lower().replace(" ", "_") for c in df.columns]
            
            processed_points = []
            for _, row in df.iterrows():
                try:
                    point = LMIDataPoint(
                        occupation_code=str(row.get("soc_code", row.get("id"))),
                        occupation_title=row.get("occupation_name", row.get("title")),
                        location_id=row.get("region", "NATIONAL"),
                        median_salary=float(row.get("median_annual_wage", 0)),
                        job_openings=int(row.get("openings", 0)),
                        growth_rate=float(row.get("percent_change", 0.0)),
                        timestamp=datetime.utcnow()
                    )
                    processed_points.append(point)
                except Exception as e:
                    logger.warning(f"Row parsing failed in {file_path}: {e}")
                    continue
            
            return processed_points
        except Exception as e:
            logger.error(f"Critical error reading CSV source: {e}")
            return []

    def extract_trend_analysis(self, data_points: List[LMIDataPoint]) -> LMITrendAnalysis:
        """
        Aggregates individual data points into a trend analysis report.
        Useful for dashboard visualizations and policy recommendations.
        """
        if not data_points:
            return LMITrendAnalysis(top_skills=[], high_growth_sectors=[], average_salary=0)

        df = pd.DataFrame([p.dict() for p in data_points])
        
        avg_salary = df["median_salary"].mean()
        high_growth = df.nlargest(5, "growth_rate")[["occupation_title", "growth_rate"]].to_dict('records')
        
        # Logic for identifying high-demand clusters
        demand_clusters = df[df["job_openings"] > df["job_openings"].quantile(0.75)]
        
        return LMITrendAnalysis(
            top_skills=list(demand_clusters["occupation_title"].unique()[:10]),
            high_growth_sectors=high_growth,
            average_salary=round(avg_salary, 2),
            data_volume=len(data_points),
            last_updated=datetime.utcnow()
        )

    def validate_ingestion_integrity(self, dataset: List[LMIDataPoint]) -> bool:
        """
        Internal QA check to ensure ingested data meets the enterprise threshold.
        """
        if not dataset:
            return False
        
        # Check for null identity fields
        null_codes = [p for p in dataset if not p.occupation_code]
        if len(null_codes) / len(dataset) > 0.1: # Threshold 10%
            logger.error("Data integrity check failed: Too many missing occupation codes.")
            return False
            
        return True

# Singleton instance for application-wide use
parser_service = LMIParser()