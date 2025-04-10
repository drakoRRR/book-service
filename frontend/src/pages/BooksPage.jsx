import React, { useState } from 'react';

const BooksPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const books = [
    {
      id: 1,
      title: "Book One",
      author: "Author One",
      genre: "Fantasy",
      description: "This is a description of Book One.",
      publication_year: 2020,
      file_url: "https://i.pinimg.com/236x/f8/e7/33/f8e73307e246642b3dacc120aa276b1d.jpg",
    },
    {
      id: 2,
      title: "Book Two",
      author: "Author Two",
      genre: "Science Fiction",
      description: "This is a description of Book Two.",
      publication_year: 2021,
      file_url: "https://i.pinimg.com/236x/f8/e7/33/f8e73307e246642b3dacc120aa276b1d.jpg",
    },
    {
      id: 3,
      title: "Book Three",
      author: "Author Three",
      genre: "Mystery",
      description: "This is a description of Book Three.",
      publication_year: 2022,
      file_url: "https://i.pinimg.com/236x/f8/e7/33/f8e73307e246642b3dacc120aa276b1d.jpg",
    },
    {
      id: 4,
      title: "Book Four",
      author: "Author Four",
      genre: "Romance",
      description: "This is a description of Book Four.",
      publication_year: 2023,
      file_url: "https://i.pinimg.com/236x/f8/e7/33/f8e73307e246642b3dacc120aa276b1d.jpg",
    },
  ];

  const filteredBooks = books.filter(
    (book) =>
      (selectedGenre ? book.genre === selectedGenre : true) &&
      (selectedAuthor ? book.author === selectedAuthor : true)
  );

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
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
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
          <option value="Author One">Author One</option>
          <option value="Author Two">Author Two</option>
          <option value="Author Three">Author Three</option>
          <option value="Author Four">Author Four</option>
        </select>
      </div>

      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.file_url} alt={book.title} className="book-image" />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Year:</strong> {book.publication_year}</p>
            <button>View Details</button>
            <button>Start Reading</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
