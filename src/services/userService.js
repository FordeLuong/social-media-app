// src/services/userService.js

// Import instance axios đã được cấu hình từ file api.js
import api from './api';

/**
 * Lấy thông tin profile của một người dùng dựa trên ID.
 * @param {string} userId - ID của người dùng cần lấy thông tin.
 * @returns {Promise} - Promise của request axios.
 */
export const getUserProfile = (userId) => {
  // Gửi một request GET đến endpoint '/users/:id'
  return api.get(`/users/${userId}`);
};

export const getUserPosts = (userId) => {
  // Gửi một request GET đến endpoint '/users/:userId/posts'
  return api.get(`/users/${userId}/posts`);
}

export const followUser = (userId) => {
  // Gửi một request POST đến endpoint '/users/:id/follow'
  return api.post(`/users/${userId}/follow`);
}

export const unfollowUser = (userId) => {
  // Gửi một request POST đến endpoint '/users/:id/unfollow'
  return api.post(`/users/${userId}/unfollow`);
}

export const updateUserProfile = (userData) => {
  // Gửi một request PUT đến endpoint '/users/profile' để cập nhật thông tin người dùng
  return api.put('/users/profile', userData);
}