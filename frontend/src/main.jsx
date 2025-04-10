// src/index.js або src/main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Тут ми імпортуємо стилі
import App from './App';  // Імпортуємо головний компонент

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);