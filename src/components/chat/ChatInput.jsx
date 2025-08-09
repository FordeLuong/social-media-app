// Vai trò: Form để người dùng nhập và gửi tin nhắn.
// Nhiệm vụ:
//      Quản lý state cho nội dung input.
// Khi form được submit:
//      Gọi socket.emit('send_message', ...) để gửi tin nhắn real-time.
//      Gọi API POST /api/messages để lưu tin nhắn vào database.
//      Xóa nội dung trong input.

// src/components/chat/ChatInput.jsx

import React, { useState } from 'react';
import '../css/chat/ChatInput.css';; // Import file CSS tương ứng

/**
 * Component form để nhập và gửi tin nhắn.
 * @param {object} props
 * @param {function(string): void} props.onSendMessage - Hàm callback được gọi khi gửi tin nhắn, nhận nội dung tin nhắn làm đối số.
 * @param {boolean} [props.loading=false] - Trạng thái loading để vô hiệu hóa form.
 */
const ChatInput = ({ onSendMessage, loading = false }) => {
  // 1. Quản lý state cho nội dung input
  const [text, setText] = useState('');

  // 2. Hàm xử lý khi form được submit
  const handleSubmit = (e) => {
    // Ngăn chặn hành vi mặc định của form (tải lại trang)
    e.preventDefault();

    // Kiểm tra nếu input rỗng hoặc chỉ chứa khoảng trắng thì không làm gì cả
    if (!text.trim()) {
      return;
    }

    // 3. Gọi hàm callback được truyền từ component cha (Messages.jsx)
    // và truyền nội dung tin nhắn lên cho cha xử lý
    onSendMessage(text);

    // 4. Xóa nội dung trong input sau khi đã gửi
    setText('');
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-input"
        placeholder="Nhập tin nhắn..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading} // Vô hiệu hóa input khi đang gửi
        autoComplete="off" // Tắt gợi ý tự động của trình duyệt
      />
      <button 
        type="submit" 
        className="chat-input-button" 
        disabled={loading || !text.trim()} // Vô hiệu hóa nút khi đang gửi hoặc input rỗng
      >
        {loading ? '...' : 'Gửi'}
      </button>
    </form>
  );
};

export default ChatInput;