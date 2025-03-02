from pydantic import BaseModel
from typing import Optional


class BookCreate(BaseModel):
    title: str
    author: str
    genre: str
    description: Optional[str] = None
    publication_year: int
    file_url: str

class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    genre: Optional[str] = None
    description: Optional[str] = None
    publication_year: Optional[int] = None
    file_url: Optional[str] = None

class BookResponse(BookCreate):
    id: str
