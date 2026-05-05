from typing import List, Optional
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict

class LearningPathBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=255, description="The title of the learning path")
    description: Optional[str] = Field(None, max_length=2000, description="Detailed description of the path objectives")
    difficulty_level: str = Field(default="Intermediate", pattern="^(Beginner|Intermediate|Advanced)$")
    category: str = Field(..., min_length=2, max_length=100)
    estimated_hours: float = Field(default=0.0, ge=0, description="Estimated time to complete the path in hours")
    is_published: bool = Field(default=False)
    tags: List[str] = Field(default_factory=list)

class LearningPathCreate(LearningPathBase):
    """
    Schema for creating a new learning path.
    """
    pass

class LearningPathUpdate(BaseModel):
    """
    Schema for updating an existing learning path. All fields are optional.
    """
    title: Optional[str] = Field(None, min_length=3, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)
    difficulty_level: Optional[str] = Field(None, pattern="^(Beginner|Intermediate|Advanced)$")
    category: Optional[str] = Field(None, min_length=2, max_length=100)
    estimated_hours: Optional[float] = Field(None, ge=0)
    is_published: Optional[bool] = None
    tags: Optional[List[str]] = None

class LearningPathInDBBase(LearningPathBase):
    id: UUID
    creator_id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class LearningPath(LearningPathInDBBase):
    """
    Schema for the learning path response, including module count or basic metadata.
    """
    module_count: int = 0

class LearningPathDetail(LearningPath):
    """
    Detailed schema including nested module summaries if required by the frontend.
    """
    # Assuming backend/app/schemas/module.py exists for recursive definitions
    # modules: List["Module"] = [] 
    pass

class LearningPathFilter(BaseModel):
    """
    Utility schema for filtering learning paths in search/list endpoints.
    """
    category: Optional[str] = None
    difficulty_level: Optional[str] = None
    is_published: Optional[bool] = True
    creator_id: Optional[UUID] = None
    search_query: Optional[str] = None