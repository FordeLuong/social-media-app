// src/components/Feed.jsx

import React from 'react';
import Post from './Post';
import './css/Feed.css';

// 1. NHẬN PROPS TỪ HOME.JSX
const Feed = ({ posts, loading, error, onPostDelete, onPostUpdate}) => {
  
  // 2. LOGIC RENDER GIỮ NGUYÊN, NHƯNG DỮ LIỆU LẤY TỪ PROPS
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
        // Chúng ta cần truyền cả hàm onPostUpdate xuống đây nữa
        <Post 
          key={post._id} 
          postData={post} 
          
          onPostUpdate={onPostUpdate}
          onPostDelete={onPostDelete} // Truyền hàm xóa bài đăng
        />
      ))}
    </div>
  );
};

export default Feed;