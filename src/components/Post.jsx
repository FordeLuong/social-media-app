// src/components/Post.jsx

import React, { useState } from 'react';
import LikeButton from './LikeButton';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { useAuth } from '../context/AuthContext';
import { deletePost, updatePost } from '../services/postService';
import { Link } from 'react-router-dom';

function Post({ postData, onPostUpdate, onPostDelete }) {
  // --- STATE MANAGEMENT ---
  // Gọi tất cả các hook ở cấp cao nhất
  const { user: currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Thêm kiểm tra an toàn cho giá trị khởi tạo của state
  const [editedContent, setEditedContent] = useState(postData ? postData.content : '');
  const [postComments, setPostComments] = useState(postData ? postData.comments || [] : []);

  // --- EARLY RETURN ---
  // Trả về sớm nếu không có dữ liệu, sau khi các hook đã được gọi
  if (!postData) {
    return null;
  }

  // --- DATA DESTRUCTURING ---
  const { _id, author, content, likes } = postData;
  const isAuthor = currentUser && currentUser._id === author._id;

  // --- EVENT HANDLERS ---
  const handleCommentAdded = (newComment) => {
    setPostComments(prevComments => [...prevComments, newComment]);
    if (onPostUpdate) {
      const updatedPost = { ...postData, comments: [...postComments, newComment] };
      onPostUpdate(updatedPost);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài đăng này?")) {
      try {
        await deletePost(_id);
        if (onPostDelete) {
          onPostDelete(_id);
        }
      } catch (error) {
        console.error("Lỗi khi xóa bài đăng:", error);
      }
    } // <--- SỬA LỖI 1: Đã đóng đúng dấu ngoặc của `if`
  }; // <--- Đã đóng đúng dấu ngoặc của `handleDeletePost`

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (editedContent.trim() === content) {
      setIsEditing(false);
      return;
    }
    try {
      const response = await updatePost(_id, { content: editedContent });
      if (onPostUpdate) onPostUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật bài đăng:", error);
      alert("Không thể cập nhật bài đăng.");
    }
  };

  // --- JSX RENDER ---
  return (
    <article className="post">
      <header className="post-header">
        <Link to={`/profile/${author._id}`} className="post-author-link">
        <div className='author-info'>
          <img 
            src={author.avatar || `https://i.pravatar.cc/150?u=${author._id}`} 
            alt={`Avatar của ${author.username}`} 
            className="post-avatar" 
          />
          <h3 className="post-author">{author.username}</h3>
        </div>
        </Link>
        {isAuthor && (
          <div className="post-menu-container">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="post-menu-button">
              ...
            </button>
            {isMenuOpen && (
              <div className="post-menu-dropdown">
                <button onClick={() => { setIsEditing(true); setIsMenuOpen(false); }} className="menu-item">Sửa</button>
                <button onClick={handleDeletePost} className="menu-item delete">Xóa</button>
              </div>
            )}
          </div>
        )}
      </header>
      
      <div className="post-content">
        {isEditing ? (
          <form onSubmit={handleUpdatePost} className="edit-post-form">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="edit-post-textarea"
              rows="3"
              required
              autoFocus
            />
            <div className='edit-post-actions'>
              <button type="button" onClick={() => setIsEditing(false)} className="cancel-edit-button">Hủy</button>
              <button type="submit" className="edit-post-button">Cập nhật</button>
            </div>
          </form>
        ) : (
          <p>{content}</p>
        )}
      </div>
      
      <footer className="post-footer">
        <LikeButton postId={_id} initialLikes={likes} />
        <div className="post-comments">
          <h4>Bình luận ({postComments.length})</h4>
          <div className="comment-list">
            {postComments && postComments.length > 0 ? (
              postComments.map((comment) => (
                <Comment
                  key={comment._id}
                  author={comment.author.username}
                  text={comment.content}
                />
              ))
            ) : (
              <p className="no-comments">Chưa có bình luận nào.</p>
            )}
          </div>
          <CommentForm postId={_id} onCommentAdded={handleCommentAdded} />
        </div>
      </footer>
    </article>
  );
} 

export default Post;