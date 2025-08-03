// src/components/Post.jsx

import React from 'react';
import LikeButton from './LikeButton'; // Giả sử bạn có các component này
import Comment from './Comment';

// 1. Sửa lại props: chỉ nhận vào một object duy nhất là `postData`
function Post({ postData }) {
  // 2. Kiểm tra an toàn: Nếu không có postData, không render gì cả
  if (!postData) {
    return null;
  }

  // 3. Lấy dữ liệu từ bên trong object `postData`
  // Dữ liệu từ API của chúng ta có cấu trúc lồng nhau (nested)
  const { author, content, comments, createdAt, likes } = postData;

  return (
    <article className="post">
      <header className="post-header">
        {/* Lấy avatar và username từ author object */}
        <img 
          src={author.avatar || `https://i.pravatar.cc/150?u=${author._id}`} 
          alt={`Avatar của ${author.username}`} 
          className="post-avatar" 
        />
        <h3 className="post-author">{author.username}</h3>
      </header>
      
      <div className="post-content">
        <p>{content}</p>
      </div>
      
      <footer className="post-footer">
        <LikeButton likes={likes} />
        
        <div className="post-comments">
          <h4>Bình luận ({comments.length})</h4>
          
          {/* 4. Thêm kiểm tra an toàn: Chỉ map khi 'comments' tồn tại và là một mảng */}
          {comments && comments.length > 0 && comments.map((comment) => (
            <Comment
              key={comment._id} // Dùng _id từ MongoDB làm key, tốt hơn index
              author={comment.author.username}
              text={comment.content}
            />
          ))}
        </div>
      </footer>
    </article>
  );
}

export default Post;