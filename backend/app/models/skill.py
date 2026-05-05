from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from backend.app.db.base_class import Base

class Skill(Base):
    """
    SQLAlchemy model for NSQF (National Skills Qualifications Framework) compliant skills.
    Maps to standardized Qualification Packs (QP) and National Occupational Standards (NOS).
    """
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    
    # Unique identifier for the skill (e.g., SSC/Q0101 for Software Developer)
    code = Column(String(50), unique=True, index=True, nullable=False)
    
    # Official name of the qualification or skill set
    name = Column(String(255), index=True, nullable=False)
    
    # Detailed description of the job role and professional expectations
    description = Column(Text, nullable=True)
    
    # NSQF levels range from 1 to 10 based on complexity and autonomy
    nsqf_level = Column(Integer, nullable=False, default=1)
    
    # Industry Sector (e.g., Electronics, Automotive, IT-ITeS)
    sector = Column(String(100), index=True, nullable=False)
    
    # Sub-sector or functional area
    sub_sector = Column(String(100), nullable=True)
    
    # Typical entry requirements or prior learning required
    entry_requirements = Column(Text, nullable=True)
    
    # Structured data for Performance Criteria (PC) and Knowledge & Understanding (KU)
    # Expected format: {"units": [{"id": "U1", "pc": ["PC1", "PC2"], "knowledge": ["K1"]}]}
    competencies = Column(JSON, nullable=True)
    
    # Versioning for tracking updates in the framework
    version = Column(String(20), default="1.0")
    
    # Audit timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships to be defined as other modules are implemented:
    # assessments = relationship("Assessment", back_populates="skill")
    # user_skills = relationship("UserSkill", back_populates="skill")

    def __repr__(self):
        return f"<Skill(code='{self.code}', name='{self.name}', level={self.nsqf_level})>"

    class Config:
        orm_mode = True