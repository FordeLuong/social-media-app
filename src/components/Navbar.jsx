// src/components/Navbar.jsx

import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // QUAN TRỌNG: Import Link và NavLink
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext';
import './css/Navbar.css';


function Navbar() {
  // Lấy thông tin người dùng và hàm logout từ context
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Social App</Link> {/* Dùng Link cho logo */}

        {/* Các link điều hướng chính */}
        <ul className="navbar-menu">
          <li>
            {/* NavLink sẽ tự động thêm class 'active' khi URL khớp */}
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Tin nhắn
            </NavLink>
          </li>
          <li>
            
            <button onClick={toggleTheme} className="theme-toggle-button">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
          {/* Thêm các link khác nếu cần */}
        </ul>

        {/* Khu vực hiển thị thông tin user hoặc nút đăng nhập/đăng ký */}
        <div className="navbar-user-actions">
          {user ? (
            // --- TRƯỜNG HỢP ĐÃ ĐĂNG NHẬP ---
            <div className="user-profile-nav">
              {/* 
                SỬA LẠI THÀNH user._id
                Đây là ID mà MongoDB tạo ra cho mỗi document.
              */}
              <Link to={`/profile/${user._id}`} className="user-info">
                <img 
                  src={user.avatar || 'https://i.pravatar.cc/150'}
                  alt="User Avatar" 
                  className="user-avatar-nav" 
                />
                {/* SỬA LẠI THÀNH user.username */}
                <span className="user-name-nav">{user.username}</span>
              </Link>
              <button onClick={logout} className="auth-button logout-button">Đăng xuất</button>
            </div>
            ) : (
            // --- TRƯỢNG HỢP CHƯA ĐĂNG NHẬP ---
            <div className="auth-links">
              <Link to="/login" className="auth-button login-button">Đăng nhập</Link>
              <Link to="/register" className="auth-button register-button">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>

      <div className=''>

      </div>
    </nav>
  );
}

export default Navbar;