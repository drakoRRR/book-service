from fastapi import HTTPException

from sqlalchemy.orm import Session

from .models import Book
from .schemas import BookCreate, BookUpdate


def create_book(db: Session, book_data: BookCreate):
    new_book = Book(**book_data.dict())
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book


def get_books(db: Session, genre: str = None, author: str = None, year: int = None):
    query = db.query(Book)

    if genre:
        query = query.filter(Book.genre == genre)
    if author:
        query = query.filter(Book.author == author)
    if year:
        query = query.filter(Book.publication_year == year)

    return query.all()


def get_book_by_id(db: Session, book_id: str):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


def update_book(db: Session, book_id: str, book_update: BookUpdate):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    for key, value in book_update.dict(exclude_unset=True).items():
        setattr(book, key, value)

    db.commit()
    db.refresh(book)
    return book
