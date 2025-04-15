import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BookDetailModal = ({ book, onClose }) => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('user'))?.user_id || null;
  const [existingProgressId, setExistingProgressId] = useState(null);

  useEffect(() => {
    const checkIfAlreadyReading = async () => {
      if (!userId || !book?.id) return;

      try {
        const res = await fetch(`http://localhost:8080/reading-progress/${userId}`);
        const data = await res.json();

        const existing = data.find(entry => entry.book_id === book.id);
        if (existing) {
          setExistingProgressId(existing.id);
        }
      } catch (err) {
        console.error('Error checking reading progress:', err);
      }
    };

    checkIfAlreadyReading();
  }, [book, userId]);

  if (!book) return null;

  const handleStartReading = async () => {
    if (!userId) {
      alert('Please log in to start reading this book.');
      return;
    }

    if (existingProgressId) {
      navigate(`/continue-reading/${book.id}?progressId=${existingProgressId}`);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/reading-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          book_id: book.id,
          current_page: 0,
          percentage_read: 0
        })
      });

      const data = await response.json();
      navigate(`/continue-reading/${book.id}?progressId=${data.id}`);
    } catch (err) {
      console.error('Error starting reading:', err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <img src={book.image_url} alt={book.title} className="modal-image" />

        <div className="modal-content">
          <h2 className="modal-title">{book.title}</h2>

          <button className="modal-button" onClick={handleStartReading}>
            Read book
          </button>

          {!userId && (
            <p style={{ color: 'red', marginTop: '0.5rem' }}>
              You must be logged in to start reading.
            </p>
          )}

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
