from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import ReadingProgressCreate, ReadingProgressUpdate, ReadingProgressResponse
from ..services import create_reading_progress, get_user_reading_progress, update_reading_progress
from typing import List


router = APIRouter()


@router.post("/", response_model=ReadingProgressResponse)
def add_progress(progress: ReadingProgressCreate, db: Session = Depends(get_db)):
    return create_reading_progress(db, progress)


@router.get("/{user_id}", response_model=List[ReadingProgressResponse])
def list_user_progress(user_id: str, db: Session = Depends(get_db)):
    return get_user_reading_progress(db, user_id)


@router.put("/{progress_id}", response_model=ReadingProgressResponse)
def edit_progress(progress_id: str, progress_update: ReadingProgressUpdate, db: Session = Depends(get_db)):
    return update_reading_progress(db, progress_id, progress_update)
