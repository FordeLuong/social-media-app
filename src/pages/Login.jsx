import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Dùng để chuyển trang
import { useAuth } from "../context/AuthContext"; // Import hook đã tạo
import "./css/Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate(); // Hook để điều hướng
  const { login } = useAuth(); // Lấy hàm login từ context
  


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Vui lòng nhập đầy đủ Username và Password.");
      return;
    }

    console.log("Login Info:", formData);

    try {
      const response = await fetch(
        "https://social-media-backend-90z2.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại.");
      }

      const userData = {
        _id: data._id,
        username: data.username,
        email: data.email,
      };
      const userToken = data.token;

      login(userData, userToken); 
      alert("Đăng nhập thành công!");
      navigate("/");

      // TODO: lưu thông tin user/token nếu cần
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Tên đăng nhập (email):</label>
        <input
          type="text"
          id="username"
          name="username"
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

        <button type="submit">Đăng nhập</button>
      </form>

      {/* ===== PHẦN MỚI THÊM VÀO ĐÂY ===== */}
      <div className="register-link-container">
        <p>
          Chưa có tài khoản?{' '}
          {/* 
            Sử dụng component <Link> để điều hướng.
            'to="/register"' phải khớp với 'path' bạn đã định nghĩa trong App.jsx 
          */}
          <Link to="/register" className="register-link">
            Đăng ký ngay
          </Link>
        </p>
      </div>
      {/* ==================================== */}

    </div>
);
}
