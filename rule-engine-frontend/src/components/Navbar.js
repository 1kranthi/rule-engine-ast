// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navbarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Updated background color
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif', // Set font family
  };

  const titleStyle = {
    color: 'white',
    margin: 0,
    fontSize: '24px',
  };

  const listStyle = {
    listStyleType: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  };

  const itemStyle = {
    marginLeft: '20px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 15px',
    transition: 'background-color 0.3s ease',
    backgroundColor: 'transparent',
    borderRadius: '5px',
  };

  const linkHoverStyle = {
    backgroundColor: '#0056b3', // Darker color on hover
  };

  return (
    <nav style={navbarStyle}>
      <h1 style={titleStyle}>Rule Engine App</h1>
      <ul style={listStyle}>
        {['/Create', '/Combine', '/Evaluate', '/Rules'].map((path, index) => (
          <li key={index} style={itemStyle}>
            <Link
              to={path}
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {path.replace('/', '').replace('-', ' ')}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
