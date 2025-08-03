// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './css/Sidebar.css';

function Sidebar() {
  const topics = [
    { name: 'Học ReactJS', path: '/topics/react' },
    { name: 'JavaScript ES6+', path: '/topics/javascript' },
    { name: 'Mẹo CSS hay', path: '/topics/css' },
    { name: 'Dự án cuối tuần', path: '/topics/projects' },
  ];

  return (
    <aside className="sidebar">
      <h3>Chủ đề nổi bật</h3>
      <ul>
        {topics.map(topic => (
          <li key={topic.name}>
            <Link to={topic.path}>{topic.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;