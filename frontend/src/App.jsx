import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Books from './pages/Books'

function App() {
  return (
    <Router>
      <nav className="bg-gray-100 p-4 shadow-md flex justify-center gap-6">
        <Link className="text-blue-600 hover:underline" to="/">📚 Books</Link>
        <Link className="text-blue-600 hover:underline" to="/login">🔐 Login</Link>
        <Link className="text-blue-600 hover:underline" to="/register">📝 Register</Link>
      </nav>
      <main className="p-6 max-w-2xl mx-auto">
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App