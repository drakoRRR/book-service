from typing import List

from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas import BookCreate, BookUpdate, BookResponse
from ..services import create_book, get_books, get_book_by_id, update_book


router = APIRouter()


@router.post("/", response_model=BookResponse)
def add_book(book: BookCreate, db: Session = Depends(get_db)):
    return create_book(db, book)


@router.get("/", response_model=List[BookResponse])
def list_books(genre: str = None, author: str = None, year: int = None, db: Session = Depends(get_db)):
    return get_books(db, genre, author, year)


@router.get("/{book_id}", response_model=BookResponse)
def book_detail(book_id: str, db: Session = Depends(get_db)):
    return get_book_by_id(db, book_id)


@router.put("/{book_id}", response_model=BookResponse)
def edit_book(book_id: str, book_update: BookUpdate, db: Session = Depends(get_db)):
    return update_book(db, book_id, book_update)
