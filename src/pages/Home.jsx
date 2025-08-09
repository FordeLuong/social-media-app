// src/pages/Home.jsx

import React, { useState, useEffect } from 'react'; // 1. Thêm useState, useEffect
import CreatePost from '../components/CreatePost';
import Feed from '../components/Feed';
import { getAllPosts } from '../services/postService'; // 2. Import service
import './css/Home.css';

const Home = () => {
  // 3. DI CHUYỂN STATE VÀ LOGIC TỪ FEED.JSX LÊN ĐÂY
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log("1. Bắt đầu fetch bài viết..."); // <-- Điệp viên 1
        const response = await getAllPosts();
        console.log("2. API trả về:", response.data); // <-- Điệp viên 2
        setPosts(response.data);
        setError(null);
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
        setError("Không thể tải được bài viết. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
        console.log("3. Fetch hoàn tất, tắt loading."); // <-- Điệp viên 3
      }
    };

    fetchPosts();
  }, []);

  // 4. HÀM NÀY SẼ ĐƯỢC TRUYỀN XUỐNG CREATEPOST.JSX
  const handlePostCreated = (newPost) => {
    // Thêm bài đăng mới vào đầu danh sách, cập nhật UI ngay lập tức
    setPosts([newPost, ...posts]);
  };
  
  const handlePostUpdate = (updatedPost) => {
    // Cập nhật bài đăng trong danh sách hiện tại
    setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
  }

  const handlePostDelete = (postId) => {
    // Xóa bài đăng khỏi danh sách hiện tại
    setPosts(posts.filter(post => post._id !== postId));
  }

  return (
    <div className="home-container">
      <main className="main-content">
        {/* 5. TRUYỀN HÀM XUỐNG CREATEPOST */}
        <CreatePost onPostCreated={handlePostCreated} />
        
        {/* 6. TRUYỀN DỮ LIỆU XUỐNG FEED */}
        <Feed 
          posts={posts} 
          loading={loading} 
          error={error} 

          onPostUpdate={handlePostUpdate}
          onPostDelete={handlePostDelete}
        /> 
      </main>
    </div>
  );
};

export default Home;