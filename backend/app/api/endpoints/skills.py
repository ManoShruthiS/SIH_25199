from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Skill])
def read_skills(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Retrieve the global skills catalog.
    """
    skills = crud.skill.get_multi(db, skip=skip, limit=limit)
    return skills

@router.post("/", response_model=schemas.Skill, status_code=status.HTTP_201_CREATED)
def create_skill(
    *,
    db: Session = Depends(deps.get_db),
    skill_in: schemas.SkillCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create a new skill entry. Restricted to administrative users.
    """
    skill = crud.skill.get_by_name(db, name=skill_in.name)
    if skill:
        raise HTTPException(
            status_code=400,
            detail="A skill with this name already exists in the system.",
        )
    return crud.skill.create(db, obj_in=skill_in)

@router.get("/{id}", response_model=schemas.Skill)
def read_skill_by_id(
    id: int,
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Get a specific skill's metadata by ID.
    """
    skill = crud.skill.get(db, id=id)
    if not skill:
        raise HTTPException(
            status_code=404,
            detail="The skill requested does not exist.",
        )
    return skill

@router.put("/{id}", response_model=schemas.Skill)
def update_skill(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    skill_in: schemas.SkillUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update metadata for an existing skill. Restricted to administrative users.
    """
    skill = crud.skill.get(db, id=id)
    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Cannot update; skill not found.",
        )
    return crud.skill.update(db, db_obj=skill, obj_in=skill_in)

@router.delete("/{id}", response_model=schemas.Skill)
def delete_skill(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Remove a skill from the catalog. Restricted to administrative users.
    """
    skill = crud.skill.get(db, id=id)
    if not skill:
        raise HTTPException(
            status_code=404,
            detail="Cannot delete; skill not found.",
        )
    return crud.skill.remove(db, id=id)

@router.get("/search/", response_model=List[schemas.Skill])
def search_skills(
    query: str,
    db: Session = Depends(deps.get_db),
    limit: int = 10
) -> Any:
    """
    Search for skills by name or keyword.
    """
    return crud.skill.search_by_name(db, query=query, limit=limit)