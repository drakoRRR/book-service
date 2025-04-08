// src/pages/Books.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Books() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    // TODO: змінити URL, коли буде бекенд
    axios.get('http://localhost:3002/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>Book Catalog</h2>
      {books.length === 0 ? (
        <p>No books yet</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
