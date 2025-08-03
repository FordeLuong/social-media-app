// src/pages/Register.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import thêm Link và useNavigate
import { registerUser } from '../services/authService'; // Import hàm register từ service
import "./css/Register.css";

export default function Register() {
  // Giữ nguyên state của form, nhưng bỏ confirmPassword vì chỉ cần để so sánh
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Backend không yêu cầu fullName, có thể bỏ qua hoặc thêm vào sau
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset lỗi
    setLoading(true);

    // --- Validation cơ bản phía client ---
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp!");
      setLoading(false);
      return;
    }
    
    // Bạn có thể thêm các validation khác cho email, password ở đây nếu muốn

    try {
      // Chuẩn bị dữ liệu để gửi đi, chỉ lấy các trường mà backend yêu cầu
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      // Gọi hàm registerUser từ service
      await registerUser(userData);

      // Nếu không có lỗi, thông báo và chuyển hướng
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login"); // Chuyển người dùng đến trang đăng nhập

    } catch (err) {
      // Lấy thông báo lỗi cụ thể từ server (ví dụ: "Email đã tồn tại")
      const errorMessage = err.response?.data?.msg || "Có lỗi xảy ra khi đăng ký.";
      setError(errorMessage);
      console.error("Lỗi khi đăng ký:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Đăng ký tài khoản</h1>
      <form onSubmit={handleSubmit} className="register-form">
        {/* Backend không có fullName, tạm thời ẩn đi */}
        {/* 
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        */}

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        
        {/* Hiển thị lỗi nếu có */}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Đang tạo...' : 'Đăng ký'}
        </button>
      </form>
      
      <div className="login-link-container">
        <p>
          Đã có tài khoản?{' '}
          <Link to="/login" className="login-link">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}