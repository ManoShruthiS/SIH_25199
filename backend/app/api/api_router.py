from fastapi import APIRouter

from app.api.endpoints import (
    auth,
    users,
    skills,
    paths,
)

# Main API Router for SIH 25199 Enterprise Project
# Target Deadline: May 18
api_router = APIRouter()

# Authentication and Authorization module
api_router.include_router(
    auth.router, 
    prefix="/auth", 
    tags=["Security & Authentication"]
)

# User Profile and Role Management
api_router.include_router(
    users.router, 
    prefix="/users", 
    tags=["User Management"]
)

# NSQF Skills Catalog
api_router.include_router(
    skills.router, 
    prefix="/skills", 
    tags=["Skills Catalog"]
)

# Personalized Learning Paths
api_router.include_router(
    paths.router, 
    prefix="/paths", 
    tags=["Learning Paths"]
)