import React, { useState } from 'react';
import '/src/styles/Navbar.css';

function Navbar({ selectedCategory, onSelectCategory }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categories = ['Latest', 'Technology', 'Science', 'Health', 'Sports', 'Entertainment'];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="logo">ACONEWS</div>
      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        {categories.map((category) => (
          <li key={category}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory(category);
              }}
              className={selectedCategory === category ? 'active' : ''}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
      <div className="hamburger" onClick={handleMobileMenuToggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        {categories.map((category) => (
          <a
            key={category}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory(category);
              setMobileMenuOpen(false);
            }}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
