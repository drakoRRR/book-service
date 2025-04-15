import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  
import BooksPage from './pages/BooksPage';
import ContinueReadingPage from './pages/ContinueReadingPage';
import BookReaderPage from './pages/BookReaderPage';

import Login from './pages/Login';
import Register from './pages/Register';

const userId = JSON.parse(localStorage.getItem('user'))?.user_id || null;


const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/continue-reading" element={<ContinueReadingPage />} />
          <Route path="/continue-reading/:bookId" element={<BookReaderPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
