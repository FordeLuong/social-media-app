// src/components/Feed.jsx

import React, { useState, useEffect } from 'react';
import Post from './Post';
import { getAllPosts } from '../services/postService';
import './css/Feed.css'; // Tạo file CSS này để style cho feed

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getAllPosts();
        setPosts(response.data);
        setError(null);
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
        setError("Không thể tải được bài viết. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Hàm callback để cập nhật UI khi có bài đăng mới
  const addPostToFeed = (newPost) => {
    setPosts([newPost, ...posts]);
  };
  
  // Bạn có thể truyền hàm này xuống cho CreatePost
  // Nhưng để đơn giản, chúng ta sẽ xử lý việc tạo bài đăng ở trang Home

  if (loading) {
    return <div className="feed-status">Đang tải bài viết...</div>;
  }

  if (error) {
    return <div className="feed-status error">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="feed-status">Chưa có bài viết nào. Hãy là người đầu tiên!</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post._id} postData={post} />
      ))}
    </div>
  );
};

export default Feed;