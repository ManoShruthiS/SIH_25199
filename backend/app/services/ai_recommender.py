import logging
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.user import User, UserSkill
from app.models.course import Course, Module
from app.schemas.recommendation import LearningPathRequest, LearningPathResponse
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

    async def build_learning_path(self, user_id: int, request: LearningPathRequest) -> Dict[str, Any]:
        """
        Main entry point for calculating the delta between current proficiency
        and target goals, then fetching relevant curriculum modules.
        """
        try:
            user = self.db.query(User).filter(User.id == user_id).first()
            if not user:
                return {"error": "User profile not found", "status": 404}

            # 1. Map Current Proficiency Profile
            current_profile = self._get_user_skill_matrix(user_id)
            
            # 2. Identify Competency Gaps
            target_skills = request.target_skills
            skill_gaps = [skill for skill in target_skills if skill not in current_profile]
            
            # 3. Compute Heuristic Sequence
            # We prioritize foundational concepts before specialized implementations
            ordered_requirements = self._sequence_by_dependency(skill_gaps)
            
            # 4. Map Content Resources
            path_nodes = []
            for skill in ordered_requirements:
                resource = self._find_optimal_resource(skill, user.experience_level)
                if resource:
                    path_nodes.append(resource)

            # 5. Calculate Velocity and Milestones
            return {
                "user_id": user_id,
                "target_goal": request.goal_description,
                "path_nodes": path_nodes,
                "metrics": {
                    "estimated_hours": sum(node.get("duration_minutes", 0) for node in path_nodes) / 60,
                    "difficulty_index": self._calculate_path_complexity(path_nodes),
                    "skill_coverage": len(path_nodes) / len(target_skills) if target_skills else 0
                }
            }

        except Exception as e:
            logger.error(f"Critical failure in path synthesis: {str(e)}")
            return {"error": "Internal computation error during path assembly"}

    def _get_user_skill_matrix(self, user_id: int) -> List[str]:
        """Retrieves verified skills from the internal persistence layer."""
        skills = self.db.query(UserSkill.skill_name).filter(
            UserSkill.user_id == user_id,
            UserSkill.proficiency_level >= 3
        ).all()
        return [s[0] for s in skills]

    def _sequence_by_dependency(self, gaps: List[str]) -> List[str]:
        """
        Applies topological sorting logic based on a predefined 
        knowledge graph of skill dependencies.
        """
        # Logic for skill hierarchy (e.g., Python before FastAPI)
        # For the crunch release, using weight-based sorting
        priority_map = {
            "fundamentals": 0,
            "language": 1,
            "framework": 2,
            "architecture": 3,
            "optimization": 4
        }
        
        # Simulated heuristic for sorting
        return sorted(gaps, key=lambda x: priority_map.get(self._get_skill_category(x), 5))

    def _get_skill_category(self, skill_name: str) -> str:
        # Dictionary-based lookup for skill classification
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

    def _find_optimal_resource(self, skill: str, user_level: str) -> Optional[Dict[str, Any]]:
        """
        Queries the content library for the highest-weighted module 
        matching the skill and user's seniority level.
        """
        course = self.db.query(Course).join(Module).filter(
            Course.tags.contains([skill]),
            Course.difficulty_level == user_level
        ).order_by(Course.rating.desc()).first()

        if course:
            return {
                "skill": skill,
                "module_id": course.id,
                "title": course.title,
                "provider": course.provider,
                "duration_minutes": course.duration_minutes,
                "resource_url": f"/curriculum/view/{course.id}"
            }
        
        # Fallback to general lookup if direct level match fails
        fallback = self.db.query(Course).filter(Course.tags.contains([skill])).first()
        if fallback:
            return {
                "skill": skill,
                "module_id": fallback.id,
                "title": fallback.title,
                "provider": fallback.provider,
                "duration_minutes": fallback.duration_minutes,
                "resource_url": f"/curriculum/view/{fallback.id}"
            }
            
        return None

    def _calculate_path_complexity(self, nodes: List[Dict[str, Any]]) -> float:
        """Returns a normalized score representing the cognitive load of the path."""
        if not nodes:
            return 0.0
        # Placeholder for complex scoring logic
        return round(len(nodes) * 1.25, 2)

def get_recommender_service(db: Session) -> RecommenderService:
    return RecommenderService(db)