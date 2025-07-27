// Bình luận

import React from 'react';
import './css/Comment.css';

// Nhận dữ liệu của comment qua props (sử dụng destructuring để lấy author và text)
function Comment({ author, text }) {
  return (
    <div className="comment">
      <p>
        <strong className="comment-author">{author}:</strong>
        <span className="comment-text"> {text}</span>
      </p>
    </div>
  );
}

export default Comment;