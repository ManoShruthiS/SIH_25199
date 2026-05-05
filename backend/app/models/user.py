import datetime

import sqlalchemy
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Table, ForeignKey
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

from backend.app.db.base import Base


# Association table for User-Role many-to-many relationship
user_roles_association = Table(
    'user_roles',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('role_id', Integer, ForeignKey('roles.id'), primary_key=True)
)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_superuser = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)

    # Relationships
    roles = relationship("Role", secondary=user_roles_association, back_populates="users")
    posts = relationship("Post", back_populates="author", cascade="all, delete-orphan")

    def set_password(self, password: str):
        """Hashes the given password and stores it."""
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        """Checks if the given password matches the stored hashed password."""
        return check_password_hash(self.hashed_password, password)

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"