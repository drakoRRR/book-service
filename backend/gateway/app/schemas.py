from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    created_at: datetime

class ReadingProgressCreate(BaseModel):
    user_id: str
    book_id: str
    current_page: int
    percentage_read: float

class ReadingProgressUpdate(BaseModel):
    current_page: Optional[int] = None
    percentage_read: Optional[float] = None

class ReadingProgressResponse(ReadingProgressCreate):
    id: str


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