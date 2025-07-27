import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const userName = localStorage.getItem('FullName');
  const isLoggedIn = !!localStorage.getItem('userID');

  const handleLogout = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('FullName');
    localStorage.removeItem('Email');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <span className="logo">CGV</span>

        <div className="dropdown" ref={dropdownRef}>
          <span className="nav-link dropdown-title" onClick={toggleDropdown}>
            Phim ▾
          </span>
          {showDropdown && (
            <div className="dropdown-content">
              <Link to="/movies" className="dropdown-item" onClick={() => setShowDropdown(false)}>Tất cả phim</Link>
              <Link to="/movies/now-showing" className="dropdown-item" onClick={() => setShowDropdown(false)}>Đang chiếu</Link>
              <Link to="/movies/coming-soon" className="dropdown-item" onClick={() => setShowDropdown(false)}>Sắp chiếu</Link>
            </div>
          )}
        </div>

        {isLoggedIn && <Link to="/booked-tickets" className="nav-link">Vé đã đặt</Link>}
        {isLoggedIn && <Link to="/booking" className="nav-link">Đặt vé</Link>}

        {isLoggedIn && localStorage.getItem('userID') === '0' && (
        <>
            <Link to="/add-movie" className="nav-link">Thêm phim</Link>
            <Link to="/add-showtime" className="nav-link">Thêm suất chiếu</Link>
        </>
        )}

      </div>

      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <span className="nav-user">User: {userName}</span>
            <button className="nav-link" onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Đăng nhập</Link>
            <Link to="/register" className="nav-link">Đăng ký</Link>
          </>
        )}
      </div>
    </div>
  );
}
