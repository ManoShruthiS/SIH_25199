from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.api import deps
from app.models.user import User
from app.models.learning_path import LearningPath
from app.schemas.learning_path import LearningPath as LearningPathSchema, LearningPathCreate, LearningPathUpdate

router = APIRouter()

@router.post("/", response_model=LearningPathSchema, status_code=status.HTTP_201_CREATED)
def create_learning_path(
    *,
    db: Session = Depends(deps.get_db),
    path_in: LearningPathCreate,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Generate a new personalized learning path based on user goals and skill level.
    """
    # Check if a similar path already exists to avoid redundancy
    existing_path = db.query(LearningPath).filter(
        LearningPath.title == path_in.title,
        LearningPath.user_id == current_user.id
    ).first()
    if existing_path:
        raise HTTPException(
            status_code=400,
            detail="A learning path with this title already exists."
        )
    
    db_obj = LearningPath(
        title=path_in.title,
        description=path_in.description,
        user_id=current_user.id,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=List[LearningPathSchema])
def read_learning_paths(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Retrieve all learning paths for the authenticated user.
    """
    return db.query(LearningPath).filter(
        LearningPath.user_id == current_user.id
    ).offset(skip).limit(limit).all()

@router.get("/{path_id}", response_model=LearningPathSchema)
def read_learning_path(
    *,
    db: Session = Depends(deps.get_db),
    path_id: int,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Get detailed information for a specific learning path.
    """
    path = db.query(LearningPath).filter(LearningPath.id == path_id).first()
    if not path:
        raise HTTPException(status_code=404, detail="Learning path not found")
    if path.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return path

@router.patch("/{path_id}", response_model=LearningPathSchema)
def update_learning_path(
    *,
    db: Session = Depends(deps.get_db),
    path_id: int,
    path_in: LearningPathUpdate,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Update the metadata or status of a learning path.
    """
    path = db.query(LearningPath).filter(LearningPath.id == path_id).first()
    if not path:
        raise HTTPException(status_code=404, detail="Learning path not found")
    if path.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    update_data = path_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(path, field, value)
    db.add(path)
    db.commit()
    db.refresh(path)
    return path

@router.delete("/{path_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_learning_path(
    *,
    db: Session = Depends(deps.get_db),
    path_id: int,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Remove a learning path from the user's profile.
    """
    path = db.query(LearningPath).filter(LearningPath.id == path_id).first()
    if not path:
        raise HTTPException(status_code=404, detail="Learning path not found")
    if path.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    db.delete(path)
    db.commit()
    return None