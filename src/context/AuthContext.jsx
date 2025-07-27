// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
// useNavigate không nên dùng trực tiếp trong Context vì nó là hook, 
// nhưng với cấu trúc của bạn thì vẫn ổn.
// Một cách nâng cao hơn là truyền navigate từ bên ngoài vào.
import { useNavigate } from 'react-router-dom'; 

// 1. Tạo Context
const AuthContext = createContext(null);

// 2. TẠO LUÔN PROVIDER TRONG NÀY
export const AuthProvider = ({ children }) => {
  // --- THAY ĐỔI 1: Thêm state cho token ---
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy cả user và token từ localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // --- THAY ĐỔI 2: Hàm login nhận cả userData và userToken ---
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken); // Cập nhật state token
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken); // Lưu token vào localStorage
    navigate('/'); // Chuyển hướng về trang chủ sau khi đăng nhập
  };

  // --- THAY ĐỔI 3: Hàm logout xóa cả user và token ---
  const logout = () => {
    setUser(null);
    setToken(null); // Xóa state token
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    navigate('/login'); // Chuyển hướng về trang đăng nhập sau khi logout
  };

  // --- THAY ĐỔI 4: Thêm token và isAuthenticated vào giá trị của context ---
  const value = useMemo(() => ({
    user,
    token, // <-- Cung cấp token
    isAuthenticated: !!token, // <-- Thêm biến tiện ích này
    login,
    logout
  }), [user, token]); // <-- Thêm token vào dependency array

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. TẠO LUÔN CUSTOM HOOK TRONG NÀY
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 4. (Tùy chọn) Bạn có thể export default chính Provider để tiện import
export default AuthProvider;