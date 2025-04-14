import React, { useState, useEffect } from 'react';
import BookDetailModal from '../pages/BookDetailModal';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/books') // заміни URL, якщо інший
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Error fetching books:', err));
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      (selectedGenre ? book.genre === selectedGenre : true) &&
      (selectedAuthor ? book.author === selectedAuthor : true)
  );

  const uniqueGenres = [...new Set(books.map(book => book.genre))];
  const uniqueAuthors = [...new Set(books.map(book => book.author))];

  return (
    <div>
      <h1>Book List</h1>

      <div>
        <label htmlFor="genre">Filter by Genre:</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="author">Filter by Author:</label>
        <select
          id="author"
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
        >
          <option value="">All</option>
          {uniqueAuthors.map((author) => (
            <option key={author} value={author}>{author}</option>
          ))}
        </select>
      </div>

      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-card" onClick={() => setSelectedBook(book)}>
            <img src={book.image_url} alt={book.title} />
            <h3>{book.title}</h3>
          </div>
        ))}
      </div>

      <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
};

export default BooksPage;
