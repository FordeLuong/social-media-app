// src/services/postService.js

// 1. Import instance axios đã được cấu hình từ file api.js
import api from './api';

// --- CÁC HÀM GỌI API CHO BÀI ĐĂNG ---

// 2. Hàm để lấy TẤT CẢ bài đăng
export const getAllPosts = () => {
  // Gửi một request GET đến endpoint '/posts'
  // URL đầy đủ sẽ là: https://.../api/posts
  return api.get('/posts');
};

// 3. Hàm để tạo một bài đăng mới
export const createPost = (postData) => {
  // postData là một object chứa { content: "Nội dung bài viết" }
  // Gửi một request POST đến '/posts' với dữ liệu là postData
  return api.post('/posts', postData);
};

// 4. Hàm để like/unlike một bài đăng
export const likePost = (postId) => {
  // Gửi một request PUT đến '/posts/:id/like'
  return api.put(`/posts/${postId}/like`);
};

// 5. Hàm để thêm một bình luận mới
export const addComment = (postId, commentData) => {
  // commentData là một object chứa { content: "Nội dung bình luận" }
  // Gửi một request POST đến '/posts/:id/comment'
  return api.post(`/posts/${postId}/comment`, commentData);
};

// 6. Hàm để xóa một bài đăng
export const deletePost = (postId) => {
  // Gửi một request DELETE đến '/posts/:id'
  return api.delete(`/posts/${postId}`);
};

// 7. Hàm để cập nhật một bài đăng
export const updatePost = (postId, postData) => {
  // Gửi một request PUT đến '/posts/:id'
  return api.put(`/posts/${postId}`, postData);
};