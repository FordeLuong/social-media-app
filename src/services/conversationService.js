// Vai trò: Tạo và duy trì một kết nối Socket.IO duy nhất cho toàn bộ ứng dụng.
// Nhiệm vụ:
//      Kết nối đến server socket khi người dùng đăng nhập.
//      Ngắt kết nối khi người dùng đăng xuất.
//      Cung cấp socket instance cho bất kỳ component nào cần dùng thông qua hook useSocket().

// src/services/conversationService.js

// 1. Import instance axios đã được cấu hình từ file api.js
// Điều này đảm bảo mọi request sẽ tự động có baseURL và token xác thực
import api from './api';

/**
 * Lấy tất cả các cuộc trò chuyện của người dùng đang đăng nhập.
 * @returns {Promise} - Promise của request axios, khi resolve sẽ trả về một mảng các cuộc trò chuyện.
 */
export const getConversations = () => {
  // Gửi một request GET đến endpoint '/conversations'
  // URL đầy đủ sẽ là: https://your-backend-url/api/conversations
  return api.get('/conversations');
};

/**
 * Tạo một cuộc trò chuyện mới với một người dùng khác (hoặc lấy cuộc trò chuyện đã có).
 * @param {string} receiverId - ID của người dùng mà bạn muốn bắt đầu cuộc trò chuyện.
 * @returns {Promise} - Promise của request axios, khi resolve sẽ trả về object của cuộc trò chuyện.
 */
export const createConversation = (receiverId) => {
  // Gửi một request POST đến '/conversations' với body chứa receiverId
  return api.post('/conversations', { receiverId });
};