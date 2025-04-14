import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const BookReaderPage = () => {
  const { bookId } = useParams();
  const [searchParams] = useSearchParams();
  const progressId = searchParams.get('progressId');
  const [book, setBook] = useState(null);
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookId) return;

    console.log('Book ID from URL:', bookId); // <-- лог для дебагу

    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:8080/books/${bookId}`);
        if (!res.ok) {
          console.error('Book not found:', res.status);
          return;
        }
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error('Failed to fetch book:', err);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleSubmit = async () => {
    const percentage = (parseInt(currentPage) / book.pages) * 100;
    await fetch(`http://localhost:8080/reading-progress/${progressId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        current_page: parseInt(currentPage),
        percentage_read: Math.min(100, Math.round(percentage))
      })
    });
    navigate('/continue-reading');
  };

  if (!bookId) return <div>Error: Book ID is missing</div>;
  if (!book) return <div>Loading...</div>;

  const embedUrl = `https://drive.google.com/file/d/${book.file_url}/preview`;

  return (
    <div>
      <h2>{book.title}</h2>
      <h4>{book.author}</h4>
      <div className="progress-input-container">
        <p>Enter the last page you read:</p>
        <input
          className="page-input"
          type="number"
          value={currentPage}
          onChange={(e) => setCurrentPage(e.target.value)}
          min={0}
          max={book.pages}
        />
        <button className="save-progress-button" onClick={handleSubmit}>
          Save Progress
        </button>
      </div>
      <div style={{ width: '70%', height: '100vh', margin: '0 auto' }}>
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          title="Book Content"
        ></iframe>
      </div>
    </div>
  );
};

export default BookReaderPage;
