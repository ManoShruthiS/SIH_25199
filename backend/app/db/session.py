from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# The engine configuration handles the connection pool to the database.
# pool_pre_ping=True ensures that stale connections are checked before use.
# pool_size and max_overflow are tuned for the enterprise load expected by the deadline.
engine = create_engine(
    settings.SQLALCHEMY_DATABASE_URI,
    pool_pre_ping=True,
    pool_size=20,
    max_overflow=10,
    pool_recycle=3600,
)

# SessionLocal is the factory for new Session objects.
# autocommit and autoflush are disabled to ensure transaction integrity.
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)