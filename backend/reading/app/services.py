from fastapi import HTTPException

from sqlalchemy.orm import Session

from .models import ReadingProgress
from .schemas import ReadingProgressCreate, ReadingProgressUpdate


def create_reading_progress(db: Session, progress_data: ReadingProgressCreate):
    new_progress = ReadingProgress(**progress_data.dict())
    db.add(new_progress)
    db.commit()
    db.refresh(new_progress)
    return new_progress

def get_user_reading_progress(db: Session, user_id: str):
    return db.query(ReadingProgress).filter(ReadingProgress.user_id == user_id).all()

def update_reading_progress(db: Session, progress_id: str, progress_update: ReadingProgressUpdate):
    progress = db.query(ReadingProgress).filter(ReadingProgress.id == progress_id).first()
    if not progress:
        raise HTTPException(status_code=404, detail="Reading progress not found")

    for key, value in progress_update.dict(exclude_unset=True).items():
        setattr(progress, key, value)

    db.commit()
    db.refresh(progress)
    return progress
