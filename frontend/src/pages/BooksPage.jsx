import React, { useState } from 'react';
import BookDetailModal from '../pages/BookDetailModal';

const BooksPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const books = [
    {
      id: 1,
      title: "Book One",
      author: "Author One",
      genre: "Fantasy",
      description: "This is a description of Book One.",
      publication_year: 2020,
      file_url: "https://manybooks.net/sites/default/files/styles/220x330_ebook/public/webform/ebook_feature_application/11401/starbreaker-v2.jpg?itok=m1PHk7ou",
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
    {
      id: 5,
      title: "Book Four",
      author: "Author Four",
      genre: "Romance",
      description: "This is a description of Book Four.",
      publication_year: 2023,
      file_url: "https://i.pinimg.com/236x/f8/e7/33/f8e73307e246642b3dacc120aa276b1d.jpg",
    },
    {
      id: 6,
      title: "Book Four",
      author: "Author Four",
      genre: "Romance",
      description: "This is a description of Book Four.",
      publication_year: 2023,
      file_url: "https://i.pinimg.com/236x/f8/e7/33/f8e73307e246642b3dacc120aa276b1d.jpg",
    },
    {
      id: 7,
      title: "Book Four",
      author: "Author Four",
      genre: "Romance",
      description: "This is a description of Book Four.",
      publication_year: 2023,
      file_url: "https://i.pinimg.com/236x/f8/e7/33/f8e73307e246642b3dacc120aa276b1d.jpg",
    },
    {
      id: 8,
      title: "Book Four",
      author: "Author Four",
      genre: "Romance",
      description: "This is a description of Book Four.",
      publication_year: 2023,
      file_url: "https://i.pinimg.com/236x/f8/e7/33/f8e73307e246642b3dacc120aa276b1d.jpg",
    },
    {
      id: 9,
      title: "Book Four",
      author: "Author Four",
      genre: "Romance",
      description: "This is a description of Book Four.",
      publication_year: 2023,
      file_url: "https://i.pinimg.com/236x/f8/e7/33/f8e73307e246642b3dacc120aa276b1d.jpg",
    },
    {
      id: 10,
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
          <div key={book.id} className="book-card" onClick={() => setSelectedBook(book)}>
            <img src={book.file_url} alt={book.title} />
            <h3>{book.title}</h3>
          </div>
        ))}
      </div>

      <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
};

export default BooksPage;
