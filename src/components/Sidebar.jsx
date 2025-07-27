// Thanh bên
// src/components/Sidebar.jsx
import React from 'react';
import './css/Sidebar.css'


function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Chủ đề nổi bật</h3>
      <ul>
        <li>Học ReactJS</li>
        <li>JavaScript ES6+</li>
        <li>Mẹo CSS hay</li>
        <li>Dự án cuối tuần</li>
      </ul>
    </aside>
  );
}

export default Sidebar;