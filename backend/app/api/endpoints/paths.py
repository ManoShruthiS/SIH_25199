from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from app.api import deps
from app.db.session import get_db
from app.models.user import User
from app.schemas.path import (
    LearningPathCreate, 
    LearningPathUpdate, 
    LearningPathResponse,
    PathStepUpdate
)
from app.crud import crud_path
from app.services.path_engine import generator

router = APIRouter()

@router.post("/", response_model=LearningPathResponse, status_code=status.HTTP_201_CREATED)
def create_learning_path(
    *,
    db: Session = Depends(get_db),
    path_in: LearningPathCreate,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Generate a new personalized learning path based on user goals and skill level.
    """
    # Check if a similar path already exists to avoid redundancy
    existing_path = crud_path.get_by_title_and_user(
        db, title=path_in.title, user_id=current_user.id
    )
    if existing_path:
        throw HTTPException(
            status_code=400,
            detail="A learning path with this title already exists."
        )
    
    # The generation engine processes the roadmap, resources, and timeline
    path_data = generator.generate_structured_path(
        user_id=current_user.id,
        goal=path_in.title,
        description=path_in.description,
        difficulty=path_in.difficulty,
        estimated_hours_per_week=path_in.estimated_hours_per_week
    )
    
    return crud_path.create_with_owner(
        db=db, obj_in=path_in, owner_id=current_user.id, generated_content=path_data
    )

@router.get("/", response_model=List[LearningPathResponse])
def read_learning_paths(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Retrieve all learning paths for the authenticated user.
    """
    return crud_path.get_multi_by_owner(
        db=db, owner_id=current_user.id, skip=skip, limit=limit
    )

@router.get("/{path_id}", response_model=LearningPathResponse)
def read_learning_path(
    *,
    db: Session = Depends(get_db),
    path_id: UUID,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Get detailed information for a specific learning path.
    """
    path = crud_path.get(db=db, id=path_id)
    if not path:
        raise HTTPException(status_code=404, detail="Learning path not found")
    if path.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return path

@router.patch("/{path_id}", response_model=LearningPathResponse)
def update_learning_path(
    *,
    db: Session = Depends(get_db),
    path_id: UUID,
    path_in: LearningPathUpdate,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Update the metadata or status of a learning path.
    """
    path = crud_path.get(db=db, id=path_id)
    if not path:
        raise HTTPException(status_code=404, detail="Learning path not found")
    if path.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return crud_path.update(db=db, db_obj=path, obj_in=path_in)

@router.patch("/{path_id}/steps/{step_id}", response_model=LearningPathResponse)
def update_path_step_progress(
    *,
    db: Session = Depends(get_db),
    path_id: UUID,
    step_id: UUID,
    step_in: PathStepUpdate,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Mark a specific step in the learning path as completed or update its progress.
    """
    path = crud_path.get(db=db, id=path_id)
    if not path:
        raise HTTPException(status_code=404, detail="Learning path not found")
    if path.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    updated_path = crud_path.update_step_status(
        db=db, db_obj=path, step_id=step_id, status_update=step_in
    )
    return updated_path

@router.delete("/{path_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_learning_path(
    *,
    db: Session = Depends(get_db),
    path_id: UUID,
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Remove a learning path from the user's profile.
    """
    path = crud_path.get(db=db, id=path_id)
    if not path:
        raise HTTPException(status_code=404, detail="Learning path not found")
    if path.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    crud_path.remove(db=db, id=path_id)
    return None

@router.get("/recommendations/trending", response_model=List[LearningPathResponse])
def get_trending_paths(
    db: Session = Depends(get_db),
    limit: int = Query(5, gt=0, le=20),
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Fetch trending public learning paths that match user interests.
    """
    return crud_path.get_trending(db, user_category=current_user.interest_category, limit=limit)