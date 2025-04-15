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

      <div className="login-button" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {user ? (
          <>
            <button
              className="login-btn"
              onClick={handleLogout}
              style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }}
            >
              Вийти
            </button>
            <span style={{ marginTop: '4px', fontSize: '0.9rem', color: '#fff', opacity: 0.9 }}>
              {user.email}
            </span>
          </>
        ) : (
          <Link to="/login">
            <button
              className="login-btn"
              style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }}
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
