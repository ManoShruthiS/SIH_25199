from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.skill import Skill
from app.schemas.skill import SkillCreate, SkillUpdate


class CRUDSkill(CRUDBase[Skill, SkillCreate, SkillUpdate]):
    """
    CRUD operations for Skills in the SIH 25199 ecosystem.
    Handles standard persistence as well as category-based filtering.
    """

    def get_by_name(self, db: Session, *, name: str) -> Optional[Skill]:
        """
        Retrieve a skill by its exact name string.
        Useful for validation and preventing duplicate entries.
        """
        return db.query(Skill).filter(Skill.name == name).first()

    def get_multi_by_category(
        self, db: Session, *, category: str, skip: int = 0, limit: int = 100
    ) -> List[Skill]:
        """
        Batch retrieval of skills filtered by a specific category.
        Used for populating dropdowns or filtering resource requirements.
        """
        return (
            db.query(Skill)
            .filter(Skill.category == category)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def search_by_name(
        self, db: Session, *, query: str, limit: int = 10
    ) -> List[Skill]:
        """
        Partial name matching for search autocompletion.
        """
        return (
            db.query(Skill)
            .filter(Skill.name.ilike(f"%{query}%"))
            .limit(limit)
            .all()
        )


skill = CRUDSkill(Skill)