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

// Bạn có thể thêm các hàm khác ở đây trong tương lai, ví dụ:
// export const updateUserProfile = (userId, profileData) => api.put(`/users/${userId}`, profileData);
// export const followUser = (userId) => api.post(`/users/${userId}/follow`);