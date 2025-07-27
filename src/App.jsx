// src/App.jsx

import { Routes, Route } from 'react-router-dom';

// Import các component Layout và Bảo vệ
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute'; // Component bảo vệ các trang cần đăng nhập

// Import các trang của bạn
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Messages from './pages/Messages';

const postData = {
  author: 'Coder Dạo',
  avatar: 'https://i.pravatar.cc/150?u=coderdao', // Lấy avatar ngẫu nhiên
  content: 'Học React thật là vui! Đây là component Post đầu tiên của tôi, nó chứa cả LikeButton và Comment. Sử dụng props để truyền dữ liệu và state để quản lý tương tác là chìa khóa.',
  comments: [
    { author: 'Alice', text: 'Bài viết hay quá bạn ơi!' },
    { author: 'Bob', text: 'Cấu trúc component rõ ràng, dễ hiểu.' },
    { author: 'Chris', text: 'Mình cũng đang học React, cảm ơn bạn đã chia sẻ.' },
  ],
};

function App() {
  return (
    <Routes>
      {/* ===== NHÓM 1: CÁC TRANG CẦN ĐĂNG NHẬP VÀ CÓ LAYOUT CHUNG ===== */}
      <Route element={<ProtectedRoute />}>
        {/* Tất cả các Route bên trong đây đều được bảo vệ bởi ProtectedRoute */}
        <Route element={<Layout />}>
          {/* Các Route này sẽ được render vào <Outlet /> của <Layout /> */}
          <Route path="/" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          {/* Thêm các trang khác cần layout chung ở đây */}
        </Route>
      </Route>

      {/* ===== NHÓM 2: CÁC TRANG CÔNG KHAI, LAYOUT ĐƠN GIẢN ===== */}
      {/* Các Route này không có Navbar hay Sidebar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* ===== NHÓM 3: ROUTE KHI KHÔNG TÌM THẤY TRANG ===== */}
      <Route path="*" element={<div>404 - Trang không tồn tại</div>} />

    </Routes>
  );
}

export default App;


