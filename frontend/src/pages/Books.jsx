import { useEffect, useState } from 'react'

export default function Books() {
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' }
  ])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Book Catalog</h2>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.id} className="bg-white p-4 rounded shadow hover:shadow-lg">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}