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
import EditProfile from './pages/EditProfile';

// App component chính
// Đây là nơi định nghĩa các route của ứng dụng
// Sử dụng Routes và Route từ react-router-dom để định nghĩa các đường dẫn
// Các trang sẽ được render vào Layout nếu được bảo vệ bởi ProtectedRoute


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
          <Route path="/accounts/edit" element={<EditProfile />} /> 
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


