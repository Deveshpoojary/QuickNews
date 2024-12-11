import React, { useState } from 'react';

const Header = ({ onCategoryChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = [
    'General',
    'Entertainment',
    'Sports',
    'Crypto',
    'Technology',
    'Health',
    'Science',
  ];

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold">QuickNews</h1>

        {/* Hamburger Menu for Small and Medium Screens */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            ></path>
          </svg>
        </button>

        {/* Categories */}
        <ul
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:flex md:flex-row md:gap-4 md:justify-end absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent items-center gap-2`}
        >
          {categories.map((category) => (
            <li key={category} className="w-full md:w-auto text-center">
              <button
                onClick={() => {
                  onCategoryChange(category.toLowerCase());
                  setMenuOpen(false); // Close the menu after selection
                }}
                className="block px-4 py-2 hover:bg-gray-700 hover:underline transition"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
