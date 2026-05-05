from typing import List, Optional, Union, Dict, Any
from sqlalchemy.orm import Session
from app.models.skill import Skill
from app.schemas.skill import SkillCreate, SkillUpdate

class CRUDSkill:
    def get(self, db: Session, id: int) -> Optional[Skill]:
        """
        Retrieve a single skill record by its primary key.
        """
        return db.query(Skill).filter(Skill.id == id).first()

    def get_by_name(self, db: Session, name: str) -> Optional[Skill]:
        """
        Retrieve a skill by its unique name identifier.
        """
        return db.query(Skill).filter(Skill.name == name).first()

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[Skill]:
        """
        Retrieve multiple skill records with pagination support.
        """
        return db.query(Skill).offset(skip).limit(limit).all()

    def create(self, db: Session, *, obj_in: SkillCreate) -> Skill:
        """
        Create a new skill record in the database.
        """
        db_obj = Skill(
            name=obj_in.name,
            category=obj_in.category,
            description=obj_in.description,
            is_active=getattr(obj_in, "is_active", True)
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Skill,
        obj_in: Union[SkillUpdate, Dict[str, Any]]
    ) -> Skill:
        """
        Update an existing skill record. Supports both schema objects and dictionaries.
        """
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        for field in update_data:
            if hasattr(db_obj, field):
                setattr(db_obj, field, update_data[field])

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: int) -> Optional[Skill]:
        """
        Remove a skill record from the database.
        """
        obj = db.query(Skill).get(id)
        if obj:
            db.delete(obj)
            db.commit()
        return obj

    def get_by_category(
        self, db: Session, *, category: str, skip: int = 0, limit: int = 100
    ) -> List[Skill]:
        """
        Filter skills by their specific category.
        """
        return (
            db.query(Skill)
            .filter(Skill.category == category)
            .offset(skip)
            .limit(limit)
            .all()
        )

skill = CRUDSkill()