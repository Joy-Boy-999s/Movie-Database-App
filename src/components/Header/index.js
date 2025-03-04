import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MovieContext } from "../../context/MovieContext";
import MovieFilterRoundedIcon from '@mui/icons-material/MovieFilterRounded';
import DensityMediumIcon from '@mui/icons-material/MenuRounded';  // Stylish Hamburger
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';  // Close Icon
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import "./index.css"; 

const Navbar = () => {
  const { searchQuery, setSearchQuery, searchMovies } = useContext(MovieContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchMovies(searchQuery);
      navigate("/search");
    }
  };

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="movie-nav-head">
          <MovieFilterRoundedIcon className="movie-icon" />
          MovieDB
        </Link>
      </div>

      {/* Normal Nav Items (Visible on Large Screens) */}
      <ul className="nav-links">
        <li>
          <Link to="/" className={isActive("/")}>Popular</Link>
        </li>
        <li>
          <Link to="/top-rated" className={isActive("/top-rated")}>
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/upcoming" className={isActive("/upcoming")}>
            Upcoming
          </Link>
        </li>
      </ul>

      {/* Search Bar for Large Screens */}
      <form className="search-form-large" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      {/* Search & Hamburger Icons (Only for Small Screens) */}
      <div className="icons-container">
        <button className="search-toggle" onClick={() => setSearchOpen(!searchOpen)}>
          <SearchRoundedIcon />
        </button>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseRoundedIcon /> : <DensityMediumIcon />}
        </button>
      </div>

      {/* Mobile Dropdown Menu (Glassy Background) */}
      <ul className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" className={isActive("/")} onClick={() => setMenuOpen(false)}>
            Popular
          </Link>
        </li>
        <li>
          <Link to="/top-rated" className={isActive("/top-rated")} onClick={() => setMenuOpen(false)}>
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/upcoming" className={isActive("/upcoming")} onClick={() => setMenuOpen(false)}>
            Upcoming
          </Link>
        </li>
      </ul>

      {/* Search Bar for Small Screens (Glassy Background) */}
      {searchOpen && (
        <form className="search-form-small" onSubmit={handleSearch} ref={searchRef}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      )}
    </nav>
  );
};

export default Navbar;
