import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContinueReadingPage = () => {
  const [readingList, setReadingList] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('user'))?.user_id || null;


  useEffect(() => {
    const fetchReadingProgress = async () => {
      const res = await fetch(`http://localhost:8080/reading-progress/${userId}`);
      const data = await res.json();
      setReadingList(data);
    };

    fetchReadingProgress();
  }, [userId]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('http://localhost:8080/books');
      const data = await res.json();
      setBooksData(data);
    };

    fetchBooks();
  }, []);

  const handleOpenBook = (bookId, progressId) => {
    navigate(`/continue-reading/${bookId}?progressId=${progressId}`);
  };

  const getBookDetails = (bookId) => booksData.find((book) => book.id === bookId);

  return (
    <div>
      <h1>Continue Reading</h1>
      <div className="book-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {readingList.map((entry) => {
          const book = getBookDetails(entry.book_id);
          if (!book) return null;

          return (
            <div
              key={entry.id}
              onClick={() => handleOpenBook(book.id, entry.id)}
              className="book-card"
              style={{
                cursor: 'pointer',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                width: '200px',
                textAlign: 'center'
              }}
            >
              <img src={book.image_url} alt={book.title} width={150} style={{ borderRadius: '4px' }} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p><strong>{entry.percentage_read}% read</strong></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContinueReadingPage;
