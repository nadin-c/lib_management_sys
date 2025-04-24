import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import bookData from '../data/bookData';
import BookCard from '../components/BookCards';
import './Header.scss';
import './Header.scss';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `http://localhost:3000/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };
  

  
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  
  const filteredBooks = bookData.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Header Component */}
      <header className="header">
        <nav className="header__nav">
          <div className="header__left">
            <form className="header__search-bar" onSubmit={handleSearch}>
              <label htmlFor="search-input" className="visually-hidden">
                Search books
              </label>
              <input
                id="search-input"
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search books"
                className="header__search-input"
              />
              <button type="submit" className="header__search-button">
                Search
              </button>
            </form>
          </div>

          <div
            className="header__menu-toggle"
            onClick={toggleMenu}
            role="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter') toggleMenu();
            }}
          >
            ☰
          </div>

          <ul
            className={`header__nav-links ${
              isMenuOpen ? 'header__nav-links--open' : ''
            }`}
          >
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/favourites" onClick={() => setIsMenuOpen(false)}>
                Favourites
              </Link>
            </li>
            <li>
              <Link to="/advanced-search" onClick={() => setIsMenuOpen(false)}>
                Advanced Search
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Search Results Section */}
      {location.pathname === '/search' && (
        <div className="search-results">
          <h1>Search Results for "{query}"</h1>
          {filteredBooks.length > 0 ? (
            <div className="book-grid">
              {filteredBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <p>No books found for your search query.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;