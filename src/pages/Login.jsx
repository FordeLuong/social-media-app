// src/pages/Login.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from '../services/authService'; // Import hàm login từ service
import "./css/Login.css";

export default function Login() {
  // Giữ nguyên state với username và password
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.username || !formData.password) {
      setError("Vui lòng nhập đầy đủ Username và Password.");
      setLoading(false);
      return;
    }

    try {
      
      const credentials = {
        username: formData.username, // Lấy giá trị từ trường username
        password: formData.password,
      };

      // Gọi hàm loginUser từ service với dữ liệu đã được chuyển đổi
      const response = await loginUser(credentials);

      const { token, ...userData } = response.data;

      // Giả sử hàm login của bạn nhận (token, user)
      login(userData, token); 
      
      navigate("/");

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(errorMessage);
      console.error("Lỗi khi đăng nhập:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit} className="login-form">
        {/* Giữ nguyên form với username */}
        <label htmlFor="username">Tên đăng nhập (email):</label>
        <input
          type="text" // Để type là "text"
          id="username"
          name="username" // Giữ name là "username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Mật khẩu:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>

      <div className="register-link-container">
        <p>
          Chưa có tài khoản?{' '}
          <Link to="/register" className="register-link">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}