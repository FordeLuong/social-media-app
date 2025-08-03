// src/services/authService.js

// Import instance axios đã được cấu hình từ file api.js
import api from './api';

/**
 * Gửi yêu cầu đăng nhập đến server.
 * @param {object} credentials - Một object chứa thông tin đăng nhập.
 * @returns {Promise} - Promise của request axios.
 */
export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};

/**
 * Gửi yêu cầu đăng ký tài khoản mới.
 * @param {object} userData - Một object chứa thông tin người dùng mới.
 * Ví dụ: { username: 'user1', email: 'test@example.com', password: '123' }
 * @returns {Promise} - Promise của request axios.
 */
export const registerUser = (userData) => {
  return api.post('/auth/register', userData);
};

// Bạn có thể thêm các hàm khác ở đây trong tương lai, ví dụ:
// export const getUserProfile = () => api.get('/auth/me');