import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, Boolean, ForeignKey, Integer, DateTime, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base_class import Base

class Course(Base):
    """
    Main course entity representing a curriculum created by an instructor.
    """
    __tablename__ = "courses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    short_description = Column(String(500), nullable=True)
    thumbnail_url = Column(String(1024), nullable=True)
    preview_video_url = Column(String(1024), nullable=True)
    
    instructor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)
    
    difficulty_level = Column(String(50), default="Beginner")  # Beginner, Intermediate, Advanced, All Levels
    language = Column(String(50), default="English")
    
    price = Column(Float, default=0.0)
    is_published = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    
    enrollment_count = Column(Integer, default=0)
    rating_avg = Column(Float, default=0.0)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    instructor = relationship("User", back_populates="courses_authored")
    category = relationship("Category", back_populates="courses")
    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan", order_by="Module.order_index")
    enrollments = relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="course", cascade="all, delete-orphan")


class Module(Base):
    """
    Grouping of lessons within a course (e.g., 'Introduction', 'Advanced Patterns').
    """
    __tablename__ = "modules"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    order_index = Column(Integer, default=0)
    is_locked = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    course = relationship("Course", back_populates="modules")
    lessons = relationship("Lesson", back_populates="module", cascade="all, delete-orphan", order_by="Lesson.order_index")


class Lesson(Base):
    """
    Individual content units within a module.
    """
    __tablename__ = "lessons"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    module_id = Column(UUID(as_uuid=True), ForeignKey("modules.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False)
    
    # Content Types: video, article, quiz, assignment, file
    lesson_type = Column(String(50), nullable=False, default="video")
    
    # Content Storage
    video_url = Column(String(1024), nullable=True)
    content_body = Column(Text, nullable=True)  # For articles/markdown
    duration_seconds = Column(Integer, default=0)
    
    order_index = Column(Integer, default=0)
    is_preview = Column(Boolean, default=False)
    is_published = Column(Boolean, default=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    module = relationship("Module", back_populates="lessons")
    attachments = relationship("LessonAttachment", back_populates="lesson", cascade="all, delete-orphan")
    user_progress = relationship("UserLessonProgress", back_populates="lesson", cascade="all, delete-orphan")


class LessonAttachment(Base):
    """
    Downloadable resources associated with a specific lesson.
    """
    __tablename__ = "lesson_attachments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    lesson_id = Column(UUID(as_uuid=True), ForeignKey("lessons.id", ondelete="CASCADE"), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_url = Column(String(1024), nullable=False)
    file_type = Column(String(100), nullable=True)
    file_size = Column(Integer, nullable=True) # size in bytes

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    lesson = relationship("Lesson", back_populates="attachments")


class Category(Base):
    """
    High-level taxonomy for course organization.
    """
    __tablename__ = "categories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), unique=True, nullable=False, index=True)
    slug = Column(String(100), unique=True, nullable=False)
    description = Column(String(500), nullable=True)
    icon_url = Column(String(1024), nullable=True)

    # Relationships
    courses = relationship("Course", back_populates="category")
