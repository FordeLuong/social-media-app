// Bài đăng
// src/components/Post.jsx
import React from 'react';
import LikeButton from './LikeButton';
import Comment from './Comment';
import './css/Post.css'

// Nhận toàn bộ dữ liệu của một bài post qua props
function Post({ author, avatar, content, comments }) {
  return (
    <article className="post">
      <header className="post-header">
        <img src={avatar} alt={`Avatar của ${author}`} className="post-avatar" />
        <h3 className="post-author">{author}</h3>
      </header>

      <div className="post-content">
        <p>{content}</p>
      </div>

      <footer className="post-footer">
        <LikeButton />
        <div className="post-comments">
          <h4>Bình luận</h4>
          {/* Dùng .map() để lặp qua mảng comments và render ra từng component Comment */}
          {/* Quan trọng: Phải có prop "key" độc nhất cho mỗi phần tử trong danh sách */}
          {comments.map((comment, index) => (
            <Comment 
              key={index} // Dùng index làm key trong ví dụ này, lý tưởng hơn là comment.id
              author={comment.author} 
              text={comment.text} 
            />
          ))}
        </div>
      </footer>
    </article>
  );
}

export default Post;