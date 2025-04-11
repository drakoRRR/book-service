import React from 'react';

const BookDetailModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <img src={book.file_url} alt={book.title} className="modal-image" />

        <div className="modal-content">
          <h2 className="modal-title">{book.title}</h2>
          <button className="modal-button">Start Reading</button>
          
          <div>
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>

          <div className="modal-info">
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Publication Year:</strong> {book.publication_year}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
