from pydantic import BaseModel
from typing import Optional


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
