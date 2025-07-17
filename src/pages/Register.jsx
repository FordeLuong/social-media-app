// Trang đăng ký

import { useState } from "react";
import "./css/Register.css"


export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // Ít nhất 6 ký tự, có chữ và số
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password và Confirm Password không khớp!");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Email không hợp lệ!");
      return;
    }

    if (!validatePassword(formData.password)) {
      alert("Mật khẩu phải ít nhất 6 ký tự, gồm cả chữ và số!");
      return;
    }

    console.log("User Info:", formData);

    try {
      // giả lập API POST (bạn thay URL API thật vào đây)
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Đăng ký thành công:", data);
      alert("Đăng ký thành công!");
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      alert("Có lỗi xảy ra khi đăng ký.");
    }
  };

  return (
    <div className="register-container">
      <h1>Đăng ký tài khoản</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}

// export default Register; // Removed duplicate default export