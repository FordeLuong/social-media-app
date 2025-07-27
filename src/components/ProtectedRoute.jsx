// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 

const ProtectedRoute = () => {
  // 1. Lấy thông tin người dùng từ AuthContext
  const { user } = useAuth();

  // 2. Kiểm tra logic
  // Nếu KHÔNG có user (nghĩa là chưa đăng nhập)
  if (!user) {
    // 3. Sử dụng component <Navigate> để chuyển hướng người dùng
    // `to="/login"`: Chuyển đến trang đăng nhập.
    // `replace`: Thay thế lịch sử duyệt web hiện tại, để người dùng không thể bấm "Back" quay lại trang trước đó.
    return <Navigate to="/login" replace />;
  }

  // 4. Nếu có user (đã đăng nhập), thì cho phép render các route con
  // <Outlet /> sẽ là nơi các route con (như <Home />, <Profile />) được hiển thị.
  return <Outlet />;
};

export default ProtectedRoute;