// Vai trò: Tạo và duy trì một kết nối Socket.IO duy nhất cho toàn bộ ứng dụng.
// Nhiệm vụ:
//      Kết nối đến server socket khi người dùng đăng nhập.
//      Ngắt kết nối khi người dùng đăng xuất.
//      Cung cấp socket instance cho bất kỳ component nào cần dùng thông qua hook useSocket().
// src/services/messageService.js

// Import instance axios đã được cấu hình từ file api.js
import api from './api';

/**
 * Lấy tất cả tin nhắn (lịch sử chat) của một cuộc trò chuyện cụ thể.
 * @param {string} conversationId - ID của cuộc trò chuyện.
 * @returns {Promise} - Promise của request axios, khi resolve sẽ trả về một mảng các tin nhắn.
 */
export const getMessages = (conversationId) => {
  // Gửi một request GET đến endpoint '/messages/:conversationId'
  // Ví dụ: https://your-backend-url/api/messages/60d...
  return api.get(`/messages/${conversationId}`);
};

/**
 * Gửi một tin nhắn mới.
 * Hàm này dùng để lưu tin nhắn vào cơ sở dữ liệu.
 * Việc gửi real-time sẽ được xử lý qua Socket.IO.
 * @param {object} messageData - Một object chứa thông tin tin nhắn.
 * Ví dụ: { conversationId: '...', text: '...' }
 * @returns {Promise} - Promise của request axios, khi resolve sẽ trả về object của tin nhắn vừa được tạo.
 */
export const sendMessage = (messageData) => {
  // Gửi một request POST đến endpoint '/messages'
  return api.post('/messages', messageData);
};