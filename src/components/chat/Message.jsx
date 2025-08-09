// Vai trò: Hiển thị một bong bóng chat.
// Nhiệm vụ:
//      Nhận props là dữ liệu của một tin nhắn (sender, text, createdAt).
//      Nhận thêm một prop, ví dụ own={true/false}, để xác định xem tin nhắn này có phải của mình hay không.
//      Dựa vào prop own, nó sẽ render ra bong bóng chat với style khác nhau (ví dụ: tin nhắn của mình ở bên phải, màu xanh; 
//      tin nhắn của người khác ở bên trái, màu xám).

// src/components/chat/Message.jsx

import React from 'react';
import { formatDistanceToNow } from 'date-fns'; // Thư viện để hiển thị thời gian "cách đây..."
import { vi } from 'date-fns/locale'; // Import ngôn ngữ tiếng Việt
import '../css/chat/Message.css'; // Import file CSS tương ứng

/**
 * Component hiển thị một bong bóng tin nhắn.
 * @param {object} props
 * @param {object} props.message - Object tin nhắn từ API.
 * @param {boolean} props.own - True nếu đây là tin nhắn của người dùng hiện tại.
 */
const Message = ({ message, own }) => {
  if (!message || !message.sender) {
    // Kiểm tra an toàn để tránh crash nếu dữ liệu không đầy đủ
    return null;
  }

  return (
    // Sử dụng class 'own' để quyết định vị trí bong bóng chat
    <div className={`message-container ${own ? 'own' : ''}`}>
      <div className="message-content">
        <img
          className="message-avatar"
          src={message.sender.avatar || `https://i.pravatar.cc/150?u=${message.sender._id}`}
          alt={`Avatar của ${message.sender.username}`}
        />
        <div className={`message-bubble ${own ? 'own' : ''}`}>
          <p className="message-text">{message.text}</p>
        </div>
      </div>
      <span className="message-timestamp">
        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true, locale: vi })}
      </span>
    </div>
  );
};

export default Message;