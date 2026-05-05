from typing import Optional
from pydantic import BaseModel, Field

class SkillBase(BaseModel):
    """
    Base schema for Skill attributes shared across creation and updates.
    Ensures consistent data structure for skill entities within the SIH 25199 ecosystem.
    """
    name: str = Field(..., min_length=1, max_length=100, description="The formal name of the skill")
    category: Optional[str] = Field(None, max_length=100, description="The domain category, e.g., 'Cloud Infrastructure', 'Data Science'")
    description: Optional[str] = Field(None, max_length=500, description="Brief description or context of the skill application")

class SkillCreate(SkillBase):
    """
    Schema used for skill registration.
    All base fields are required or have defaults inherited.
    """
    pass

class SkillUpdate(BaseModel):
    """
    Schema for updating existing skill records.
    All fields are optional to allow partial updates (PATCH).
    """
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    category: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = Field(None, max_length=500)

class SkillInDBBase(SkillBase):
    """
    Internal representation of a skill as stored in the database.
    Includes the primary key for relational mapping.
    """
    id: int

    class Config:
        from_attributes = True

class Skill(SkillInDBBase):
    """
    Public schema for Skill data returned via API endpoints.
    Inherits database fields and includes metadata for the client.
    """
    pass

class SkillInDB(SkillInDBBase):
    """
    Schema specifically for internal services that might require access 
    to additional DB-specific flags not exposed to the public API.
    """
    pass