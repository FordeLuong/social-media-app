// src/components/CreatePost.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createPost } from '../services/postService';
import './css/CreatePost.css'; // Tạo file CSS này để style cho form

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Nội dung không được để trống.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await createPost({ content });
      // Sau khi tạo thành công, gọi callback để cập nhật danh sách bài đăng ở trang Home
      onPostCreated(response.data);
      // Reset nội dung input
      setContent(''); 
    } catch (err) {
      setError('Không thể tạo bài viết. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null; // Không hiển thị form nếu chưa đăng nhập
  }

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit} className="create-post-form">
        <img 
          src={user.avatar || `https://i.pravatar.cc/150?u=${user._id}`} 
          alt="Your avatar" 
          className="create-post-avatar" 
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Bạn đang nghĩ gì, ${user.username}?`}
          rows="3"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Đang đăng...' : 'Đăng'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CreatePost;