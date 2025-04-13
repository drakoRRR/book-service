import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-library.png';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="brand">
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
        {user ? (
          <button className="login-btn" onClick={handleLogout}>
            Вийти
          </button>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
