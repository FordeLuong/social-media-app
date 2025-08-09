// Vai trò: Hiển thị một dòng trong danh sách các cuộc trò chuyện.
// Nhiệm vụ:
//      Nhận props là dữ liệu của một cuộc trò chuyện (bao gồm thông tin của người đối diện).
//      Hiển thị avatar, username của người bạn đang chat.
//      Có thể hiển thị tin nhắn cuối cùng (nếu có).
//      Khi được click, nó sẽ gọi một hàm callback được truyền từ Messages.jsx để báo rằng "tôi đã được chọn".

// src/components/chat/ConversationItem.jsx

import React, { useState, useEffect } from 'react';
import '../css/chat/ConversationItem.css'; // Import file CSS tương ứng

/**
 * Component hiển thị một cuộc trò chuyện trong danh sách.
 * @param {object} props
 * @param {object} props.conversation - Object cuộc trò chuyện từ API.
 * @param {object} props.currentUser - Object của người dùng đang đăng nhập.
 * @param {boolean} props.isActive - True nếu đây là cuộc trò chuyện đang được chọn.
 */
const ConversationItem = ({ conversation, currentUser, isActive }) => {
  // 1. Dùng state để lưu thông tin của người bạn đang chat
  const [friend, setFriend] = useState(null);

  // 2. Sử dụng useEffect để tìm ra người bạn từ mảng `members`
  useEffect(() => {
    // `conversation.members` là một mảng chứa 2 người dùng.
    // Chúng ta cần tìm ra người không phải là `currentUser`.
    if (currentUser && conversation.members) {
      const otherUser = conversation.members.find(
        (member) => member._id !== currentUser._id
      );
      setFriend(otherUser);
    }
  }, [conversation, currentUser]);

  // Nếu chưa tìm thấy thông tin bạn bè, không render gì cả (hoặc có thể render một skeleton)
  if (!friend) {
    return null;
  }

  // 3. Render giao diện
  // Thêm class 'active' nếu `isActive` là true để làm nổi bật
  return (
    <div className={`conversation-item ${isActive ? 'active' : ''}`}>
      <img
        src={friend.avatar || `https://i.pravatar.cc/150?u=${friend._id}`}
        alt={`Avatar của ${friend.username}`}
        className="conversation-avatar"
      />
      <div className="conversation-info">
        <span className="conversation-username">{friend.username}</span>
        {/* Trong tương lai, bạn có thể hiển thị tin nhắn cuối cùng ở đây */}
        <span className="conversation-last-message">
          Bắt đầu cuộc trò chuyện...
        </span>
      </div>
    </div>
  );
};

export default ConversationItem;