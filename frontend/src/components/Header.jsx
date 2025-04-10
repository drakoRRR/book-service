import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={brandStyle}>
        <h1>Online Library</h1>
      </div>
      <nav style={navStyle}>
        <ul style={navListStyle}>
          <li style={navItemStyle}><Link to="/" style={linkStyle}>Book List</Link></li>
          <li style={navItemStyle}><Link to="/continue-reading" style={linkStyle}>Continue Reading</Link></li>
        </ul>
      </nav>
      <div style={loginButtonStyle}>
        <button style={loginButtonStyleObject}>Login</button>
      </div>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: '#007BFF',
  color: 'white',
};

const brandStyle = {
  fontSize: '1.5rem',
};

const navStyle = {
  flexGrow: 1,
};

const navListStyle = {
  display: 'flex',
  justifyContent: 'center',
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const navItemStyle = {
  margin: '0 1rem',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.1rem',
};

const loginButtonStyle = {
  marginLeft: 'auto',
};

const loginButtonStyleObject = {
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  color: '#007BFF',
  border: '1px solid #007BFF',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Header;
