import uuid

from sqlalchemy import Column, String, Integer, Float, ForeignKey

from .database import Base


class ReadingProgress(Base):
    __tablename__ = "reading_progress"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, nullable=False)  # FK на User Service
    book_id = Column(String, nullable=False)  # FK на Book Service
    current_page = Column(Integer, nullable=False, default=0)
    percentage_read = Column(Float, nullable=False, default=0.0)
