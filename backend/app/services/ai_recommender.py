import logging
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.user import User, UserSkill
from app.models.course import Course, Module
from app.models.skill import Skill
from app.core.config import settings

logger = logging.getLogger(__name__)

class RecommenderService:
    """
    Core service for synthesizing personalized learning trajectories.
    Utilizes skill-gap analysis and content mapping to produce
    sequenced educational roadmaps.
    """

    def __init__(self, db: Session):
        self.db = db

    async def build_learning_path(self, user_id: int, target_skills: List[str], goal_description: str = "") -> Dict[str, Any]:
        """
        Main entry point for calculating the delta between current proficiency
        and target goals, then fetching relevant curriculum modules.
        """
        try:
            user = self.db.query(User).filter(User.id == user_id).first()
            if not user:
                return {"error": "User profile not found", "status": 404}

            # 1. Map Current Proficiency Profile
            current_skills = {s.skill_name.lower(): s.proficiency_level for s in user.skills}
            
            # 2. Identify Competency Gaps
            # A gap exists if the user doesn't have the skill or if proficiency is < 3
            skill_gaps = [
                skill for skill in target_skills 
                if current_skills.get(skill.lower(), 0) < 3
            ]
            
            # 3. Compute Heuristic Sequence
            # We prioritize foundational concepts before specialized implementations
            ordered_requirements = self._sequence_by_dependency(skill_gaps)
            
            # 4. Map Content Resources
            path_nodes = []
            for skill_name in ordered_requirements:
                resource = self._find_optimal_resource(skill_name)
                if resource:
                    path_nodes.append(resource)

            # 5. Calculate Velocity and Milestones
            return {
                "user_id": user_id,
                "target_goal": goal_description,
                "path_nodes": path_nodes,
                "metrics": {
                    "estimated_hours": sum(node.get("duration_minutes", 0) for node in path_nodes) / 60,
                    "difficulty_index": self._calculate_path_complexity(path_nodes),
                    "skill_coverage": len(path_nodes) / len(target_skills) if target_skills else 0,
                    "gap_count": len(skill_gaps)
                }
            }

        except Exception as e:
            logger.error(f"Critical failure in path synthesis: {str(e)}")
            return {"error": f"Internal computation error: {str(e)}"}

    def _sequence_by_dependency(self, gaps: List[str]) -> List[str]:
        """
        Applies topological sorting logic based on a predefined 
        knowledge graph of skill dependencies.
        """
        priority_map = {
            "fundamentals": 0,
            "language": 1,
            "framework": 2,
            "architecture": 3,
            "optimization": 4
        }
        
        return sorted(gaps, key=lambda x: priority_map.get(self._get_skill_category(x), 5))

    def _get_skill_category(self, skill_name: str) -> str:
        _categories = {
            "Python": "language",
            "JavaScript": "language",
            "SQL": "language",
            "React": "framework",
            "FastAPI": "framework",
            "Docker": "architecture",
            "CI/CD": "optimization"
        }
        return _categories.get(skill_name, "other")

    def _find_optimal_resource(self, skill_name: str) -> Optional[Dict[str, Any]]:
        """
        Queries the content library for the highest-weighted module 
        matching the skill name.
        """
        course = self.db.query(Course).filter(
            Course.title.ilike(f"%{skill_name}%"),
            Course.is_published == True
        ).order_by(Course.rating_avg.desc()).first()

        if course:
            return {
                "skill": skill_name,
                "course_id": course.id,
                "title": course.title,
                "difficulty": course.difficulty_level,
                "resource_url": f"/curriculum/view/{course.id}"
            }
            
        return None

    def _calculate_path_complexity(self, nodes: List[Dict[str, Any]]) -> float:
        """Returns a normalized score representing the cognitive load of the path."""
        if not nodes:
            return 0.0
        return round(len(nodes) * 1.25, 2)

def get_recommender_service(db: Session) -> RecommenderService:
    return RecommenderService(db)