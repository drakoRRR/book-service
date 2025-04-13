import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  
import BooksPage from './pages/BooksPage';
import ContinueReadingPage from './pages/ContinueReadingPage';

import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/continue-reading" element={<ContinueReadingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
