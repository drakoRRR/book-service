import React from 'react';
import { Link } from 'react-router-dom';

// Шлях до логотипу
import logo from '../assets/logo-library.png';

const Header = () => {
  return (
    <header className="header">
      <div className="brand">
        {/* Логотип, який веде на головну */}
        <Link to="/">
          <img src={logo} alt="Online Library Logo" className="logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/" className="link">Book List</Link></li>
          <li><Link to="/continue-reading" className="link">Continue Reading</Link></li>
        </ul>
      </nav>
      <div className="login-button">
        <button>Login</button>
      </div>
    </header>
  );
};

export default Header;