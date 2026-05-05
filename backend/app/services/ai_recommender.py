from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from app.models.course import Course
from app.models.skill import Skill
from app.models.user_skill import UserSkill
from app.models.curriculum import Module, Lesson

class SkillPathOptimizer:
    """
    Core engine for calculating educational trajectories based on user competency gaps.
    Handles the mapping of skill requirements to course modules and sequences content
    based on prerequisite hierarchies and difficulty scaling.
    """
    
    def __init__(self, db: Session):
        self.db = db

    def get_user_proficiency(self, user_id: int) -> Dict[int, int]:
        """
        Retrieves current skill levels for a specific user.
        """
        skills = self.db.query(UserSkill).filter(UserSkill.user_id == user_id).all()
        return {s.skill_id: s.proficiency_level for s in skills}

    def identify_knowledge_gaps(self, user_id: int, target_skill_id: int) -> List[Dict[str, Any]]:
        """
        Compares user's current profile against the requirements of a target skill
        and its prerequisite chain.
        """
        target_skill = self.db.query(Skill).filter(Skill.id == target_skill_id).first()
        if not target_skill:
            return []

        user_levels = self.get_user_proficiency(user_id)
        
        # Recursive check for prerequisites
        required_skills = self._flatten_prerequisites(target_skill)
        
        gaps = []
        for skill in required_skills:
            current_level = user_levels.get(skill.id, 0)
            if current_level < skill.min_required_level:
                gaps.append({
                    "skill_id": skill.id,
                    "skill_name": skill.name,
                    "gap_magnitude": skill.min_required_level - current_level,
                    "priority": skill.priority_weight
                })
        
        return sorted(gaps, key=lambda x: x['priority'], reverse=True)

    def _flatten_prerequisites(self, skill: Skill) -> List[Skill]:
        """
        Traverses the skill dependency graph to find all necessary competencies.
        """
        all_reqs = [skill]
        for prereq in skill.prerequisites:
            all_reqs.extend(self._flatten_prerequisites(prereq))
        return list({s.id: s for s in all_reqs}.values())

    def recommend_sequence(self, user_id: int, target_skill_id: int) -> Dict[str, Any]:
        """
        Main entry point for generating a curated learning path.
        Selects modules based on efficiency scores and logical progression.
        """
        gaps = self.identify_knowledge_gaps(user_id, target_skill_id)
        if not gaps:
            return {"status": "complete", "message": "User already meets proficiency targets."}

        recommended_modules = []
        total_estimated_minutes = 0
        
        for gap in gaps:
            # Find modules that map to this specific skill gap
            modules = self.db.query(Module).join(Module.skills).filter(
                Skill.id == gap['skill_id']
            ).order_by(Module.rating.desc()).limit(3).all()
            
            for module in modules:
                if module.id not in [m['id'] for m in recommended_modules]:
                    recommended_modules.append({
                        "id": module.id,
                        "title": module.title,
                        "duration": module.estimated_duration,
                        "difficulty": module.difficulty_index,
                        "resource_url": module.resource_link,
                        "mapped_skill": gap['skill_name']
                    })
                    total_estimated_minutes += module.estimated_duration

        # Sort modules by difficulty index to ensure a logical learning curve
        recommended_modules.sort(key=lambda x: x['difficulty'])

        return {
            "user_id": user_id,
            "target_skill_id": target_skill_id,
            "estimated_completion_time": total_estimated_minutes,
            "path_nodes": recommended_modules,
            "confidence_score": self._calculate_path_reliability(recommended_modules)
        }

    def _calculate_path_reliability(self, modules: List[Dict]) -> float:
        """
        Returns a score representing the statistical relevance of the recommended path.
        """
        if not modules:
            return 0.0
        
        # Heuristic based on module ratings and coverage
        scores = [m.get('rating', 4.0) for m in modules]
        return round(sum(scores) / len(scores) / 5.0, 2)

    def update_path_adaptive(self, user_id: int, current_path_id: int, performance_metric: float):
        """
        Adjusts the remaining path based on user performance in recent modules.
        If performance is high, it may skip introductory content.
        If performance is low, it injects foundational modules.
        """
        if performance_metric < 0.6:
            # Inject supplementary foundational material
            return self._recalculate_with_remediation(user_id, current_path_id)
        elif performance_metric > 0.9:
            # Fast-track to advanced modules
            return self._recalculate_with_acceleration(user_id, current_path_id)
        
        return None

    def _recalculate_with_remediation(self, user_id: int, path_id: int):
        # Implementation for adding prerequisite reinforcements
        pass

    def _recalculate_with_acceleration(self, user_id: int, path_id: int):
        # Implementation for skipping redundant nodes
        pass