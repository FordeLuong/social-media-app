// src/pages/Home.jsx

import React from 'react';
import CreatePost from '../components/CreatePost';
import Feed from '../components/Feed'; // 1. Import Feed component
import './css/Home.css';

const Home = () => {

  // Logic để cập nhật feed sau khi tạo post mới sẽ được xử lý sau
  // Hiện tại, người dùng sẽ cần refresh trang để thấy bài đăng mới.
  // Chúng ta sẽ cải thiện điều này bằng Context hoặc state lifting.
  const handlePostCreated = () => {
    // Tạm thời, chúng ta có thể làm cách đơn giản nhất là reload lại trang
    // window.location.reload(); 
    // Hoặc lý tưởng hơn là có một cách để trigger Feed component fetch lại dữ liệu
    console.log("Post mới đã được tạo, cần cập nhật lại feed!");
  };

  return (
    <div className="home-container">
      {/* Phần trung tâm của trang chủ */}
      <main className="main-content">
        <CreatePost onPostCreated={handlePostCreated} />
        <Feed /> 
      </main>
    </div>
  );
};

export default Home;