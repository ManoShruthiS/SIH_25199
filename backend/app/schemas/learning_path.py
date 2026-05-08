from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

class LearningPathBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=255, description="The title of the learning path")
    description: Optional[str] = Field(None, max_length=2000, description="Detailed description of the path objectives")

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

class LearningPathInDBBase(LearningPathBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class LearningPath(LearningPathInDBBase):
    """
    Schema for the learning path response.
    """
    pass

class LearningPathFilter(BaseModel):
    """
    Utility schema for filtering learning paths in search/list endpoints.
    """
    is_published: Optional[bool] = True
    user_id: Optional[int] = None
    search_query: Optional[str] = None