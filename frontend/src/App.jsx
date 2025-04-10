import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Імпортуємо Header
import BooksPage from './pages/BooksPage';
import ContinueReadingPage from './pages/ContinueReadingPage.jsx';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/continue-reading" element={<ContinueReadingPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
