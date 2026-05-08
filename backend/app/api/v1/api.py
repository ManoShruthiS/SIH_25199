from fastapi import APIRouter
from app.api.endpoints import auth, users, skills, paths

api_router = APIRouter()

api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(skills.router, prefix="/skills", tags=["skills"])
api_router.include_router(paths.router, prefix="/paths", tags=["paths"])
