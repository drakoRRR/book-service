import { useNavigate } from 'react-router-dom';

const BookDetailModal = ({ book, onClose }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  if (!book) return null;

  const handleStartReading = async () => {
    if (!book?.id) {
      console.error('Book ID is undefined');
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
          <button className="modal-button" onClick={handleStartReading}>Start Reading</button>
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
