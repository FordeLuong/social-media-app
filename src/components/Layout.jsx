// src/components/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom'; // QUAN TRỌNG: Import Outlet
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// Component này định nghĩa cấu trúc chung cho các trang cần Navbar và Sidebar
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="app-content">
        <div className="post-feed">
          {/* Outlet là nơi React Router sẽ render component của trang con */}
          {/* Ví dụ: URL là '/' -> <Home /> sẽ được render ở đây */}
          <Outlet />
        </div>
        <Sidebar />
      </main>
    </>
  );
};

export default Layout;