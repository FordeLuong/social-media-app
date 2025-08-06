// src/components/CommentForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addComment } from '../services/postService';
import './css/CommentForm.css';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const response = await addComment(postId, { content });
      onCommentAdded(response.data);
      setContent('');
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
      alert("Không thể gửi bình luận, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null; // Không hiển thị form nếu chưa đăng nhập

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <img 
        src={user.avatar || `https://i.pravatar.cc/150?u=${user._id}`} 
        alt="your avatar" 
        className="comment-form-avatar" 
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Viết bình luận..."
        className="comment-form-input"
        disabled={loading}
      />
      <button type="submit" className="comment-form-button" disabled={loading}>
        Gửi
      </button>
    </form>
  );
};

export default CommentForm;