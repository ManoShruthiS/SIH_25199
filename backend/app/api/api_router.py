from fastapi import APIRouter

from app.api.endpoints import (
    auth,
    users,
    analytics,
    reports,
    data_stream,
    system,
    integration
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

# Core Analytics Engine endpoints
api_router.include_router(
    analytics.router, 
    prefix="/analytics", 
    tags=["Analytics Engine"]
)

# Automated Reporting and Export functionality
api_router.include_router(
    reports.router, 
    prefix="/reports", 
    tags=["Reporting Services"]
)

# Real-time Data Streaming and Ingestion
api_router.include_router(
    data_stream.router, 
    prefix="/data", 
    tags=["Data Ingestion"]
)

# Third-party Enterprise Integration logic
api_router.include_router(
    integration.router, 
    prefix="/integrations", 
    tags=["External Integrations"]
)

# System Monitoring and Health Checks
api_router.include_router(
    system.router, 
    prefix="/system", 
    tags=["System Infrastructure"]
)