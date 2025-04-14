import uuid

from sqlalchemy import Column, String, Integer, Text

from .database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    genre = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    publication_year = Column(Integer, nullable=False)
    file_url = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    pages: int
