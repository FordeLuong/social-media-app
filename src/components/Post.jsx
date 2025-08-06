// src/components/Post.jsx

import React, {useState} from 'react';
import LikeButton from './LikeButton'; // Giả sử bạn có các component này
import Comment from './Comment';
import CommentForm from './CommentForm'; // Giả sử bạn có component này để thêm bình luận



function Post({ postData, onPostUpdate }) {
  // 2. Kiểm tra an toàn: Nếu không có postData, không render gì cả
  const [postComments, setPostComments] = useState(postData.comments || []);

  if (!postData) {
    return null;
  }
  

  // 3. Lấy dữ liệu từ bên trong object `postData`
  // Dữ liệu từ API của chúng ta có cấu trúc lồng nhau (nested)
  const {_id, author, content, likes } = postData;

  
  const handleCommentAdded = (newComment) => {
    // Thêm bình luận mới vào danh sách hiện tại để cập nhật giao diện
    setPostComments([...postComments, newComment]);

    // (Tùy chọn) Có thể thông báo lên cho Feed.jsx biết để cập nhật tổng số comment
    if (onPostUpdate) {
        const updatedPost = { ...postData, comments: [...postComments, newComment] };
        onPostUpdate(updatedPost);
    }
  };
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
          
          {/* 5. THÊM FORM BÌNH LUẬN VÀO ĐÂY */}
          <CommentForm postId={_id} onCommentAdded={handleCommentAdded} />
        </div>
      </footer>
    </article>
  );
}

export default Post;