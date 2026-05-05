from sqlalchemy import Column, String, ForeignKey, DateTime, Enum, Table, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base_class import Base
import enum

class PathStatus(enum.Enum):
    NOT_STARTED = "not_started"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    ARCHIVED = "archived"

# Association table for Many-to-Many relationship between LearningPaths and Courses
learning_path_courses = Table(
    "learning_path_courses",
    Base.metadata,
    Column("learning_path_id", UUID(as_uuid=True), ForeignKey("learning_path.id", ondelete="CASCADE"), primary_key=True),
    Column("course_id", UUID(as_uuid=True), ForeignKey("course.id", ondelete="CASCADE"), primary_key=True),
    Column("order_index", Integer, default=0),
    Column("added_at", DateTime, default=datetime.utcnow)
)

class LearningPath(Base):
    """
    Represents a personalized sequence of courses tailored to a specific user's 
    skill gaps and career objectives.
    """
    __tablename__ = "learning_path"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(1000), nullable=True)
    
    # Tracking progress and status
    status = Column(Enum(PathStatus), default=PathStatus.NOT_STARTED, nullable=False)
    progress_percentage = Column(Integer, default=0)
    
    # Metadata for the generation logic
    target_role = Column(String(100), nullable=True)
    estimated_completion_time = Column(Integer, nullable=True) # Estimated hours
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    user = relationship("User", back_populates="learning_paths")
    courses = relationship(
        "Course", 
        secondary=learning_path_courses,
        backref="associated_paths",
        order_by="learning_path_courses.c.order_index"
    )

    def __repr__(self):
        return f"<LearningPath(id={self.id}, title={self.title}, user_id={self.user_id})>"

    def calculate_progress(self):
        """
        Logic to update the progress_percentage based on completed 
        modules/courses within this path.
        """
        # This implementation will be handled by the service layer
        # but the hook is defined here for clarity.
        pass