// Vai trò: Đây là component "thông minh" (smart component) quản lý toàn bộ trạng thái và logic của trang Chat.
// Nhiệm vụ:
//      Sử dụng useSocket() để lấy instance socket.
//      Sử dụng useEffect để fetch danh sách các cuộc trò chuyện (GET /api/conversations) khi trang được tải lần đầu.
// Quản lý state:
//      conversations: Mảng chứa danh sách các cuộc trò chuyện.
//      currentChat: Object chứa thông tin cuộc trò chuyện đang được chọn.
//      messages: Mảng chứa các tin nhắn của currentChat.
//      newMessage: State để lưu tin nhắn mới nhận từ socket.
// Xử lý sự kiện:
//      Khi người dùng click vào một ConversationItem, nó sẽ set currentChat và gọi API để fetch lịch sử tin nhắn của cuộc trò chuyện đó.
//      Sử dụng useEffect để lắng nghe sự kiện socket.on('receive_message') và cập nhật state messages.
// Bố cục: Render ra layout 2 cột: một bên là danh sách các ConversationItem, bên còn lại là khung chat (bao gồm MessageList và ChatInput).

import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { getConversations } from '../services/conversationService';
import { getMessages, sendMessage } from '../services/messageService';
// Các component chat nằm trong src/components/chat/
import ConversationItem from '../components/chat/ConversationItem'; 
import Message from '../components/chat/Message';
import ChatInput from '../components/chat/ChatInput';
import './css/Messages.css';


const Messages = () => {
  const socket = useSocket();
  const { user } = useAuth();
  const scrollRef = useRef();


  const [conversations, setConversations] = useState([]);  //Lưu danh sách các cuộc trò chuyện ở cột bên trái.
  const [currentChat, setCurrentChat] = useState(null); //Lưu thông tin về cuộc trò chuyện mà người dùng đang chọn. Ban đầu là null.
  const [messages, setMessages] = useState([]); //Lưu danh sách tin nhắn của currentChat.
  const [loadingConversations, setLoadingConversations] = useState(true); //Các state để quản lý trạng thái tải dữ liệu, giúp hiển thị thông báo "Đang tải..." cho người dùng.
  const [loadingMessages, setLoadingMessages] = useState(false);

   // --- SIDE EFFECTS (useEffect) ---

  // 1. Lắng nghe tin nhắn mới từ Socket.IO
  useEffect(() => {
    if (!socket) return; // Nếu chưa có kết nối socket, không làm gì cả

    const handleReceiveMessage = (newMessage) => {
      // Kiểm tra xem tin nhắn có thuộc về cuộc trò chuyện hiện tại không
      if (currentChat && newMessage.conversationId === currentChat._id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    // Lắng nghe sự kiện 'receive_message' từ server
    socket.on('receive_message', handleReceiveMessage); //đăng ký một hàm (socket.on) cho sự kiện tên là receive_message.
                                                        // Khi có tin nhắn mới đến, hàm handleReceiveMessage sẽ chạy.
                                                        //Nó kiểm tra xem tin nhắn đó có thuộc về cuộc trò chuyện đang xem không (currentChat). Nếu đúng, nó sẽ thêm tin nhắn mới vào cuối mảng messages, khiến giao diện tự động cập nhật.
    // Dọn dẹp sự kiện khi component unmount
    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket, currentChat]); // Dependency Array [socket, currentChat]: useEffect này sẽ chạy lại mỗi khi socket hoặc currentChat thay đổi.
  
  // 2. Fetch danh sách các cuộc trò chuyện khi component mount
  useEffect(() => {
    const fetchConversations = async () => {
        try {
            setLoadingConversations(true); // Bật trạng thái loading
            const response = await getConversations(user._id); // Gọi API để lấy danh sách cuộc trò chuyện
            setConversations(response.data); // Cập nhật state conversations với dữ liệu từ API
        } catch (error) {
            console.error('Error fetching conversations:', error); // In lỗi ra console nếu có
        } finally {
            setLoadingConversations(false); // Tắt trạng thái loading
        }
    };
    fetchConversations(); // Gọi hàm fetchConversations khi component mount
    }, [user._id]); // Dependency Array [user._id]: useEffect này sẽ chạy lại mỗi khi user._id thay đổi (ví dụ: khi người dùng đăng nhập).

    // 3. Fetch tin nhắn của cuộc trò chuyện hiện tại khi currentChat thay đổi
    useEffect(() => {
        if (!currentChat) return; // Nếu không có cuộc trò chuyện hiện tại, không làm gì cả

        const fetchMessages = async () => {
            try {
                setLoadingMessages(true); // Bật trạng thái loading
                const response = await getMessages(currentChat._id); // Gọi API để lấy tin nhắn của cuộc trò chuyện hiện tại
                setMessages(response.data); // Cập nhật state messages với dữ liệu từ API
            } catch (error) {
                console.error('Error fetching messages:', error); // In lỗi ra console nếu có
            } finally {
                setLoadingMessages(false); // Tắt trạng thái loading
            }
        };
        fetchMessages(); // Gọi hàm fetchMessages khi currentChat thay đổi
    }, [currentChat]); // Dependency Array [currentChat]: useEffect này sẽ chạy lại mỗi khi currentChat thay đổi (ví dụ: khi người dùng chọn một cuộc trò chuyện khác).

    // 4. Tự động cuộn xuống cuối danh sách tin nhắn khi có tin nhắn mới
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' }); // Cuộn xuống cuối danh sách tin nhắn với hiệu ứng mượt mà
        }
    }, [messages]); // Dependency Array [messages]: useEffect này sẽ chạy lại mỗi khi messages thay đổi (ví dụ: khi có tin nhắn mới được gửi hoặc nhận).

  // --- HANDLERS (Xử lý sự kiện) ---
    // Xử lý khi gửi một tin nhắn mới (hàm này sẽ được truyền xuống ChatInput)
    const handleSendMessage = async (newMessage) => {
        if (!currentChat) return; // Nếu không có cuộc trò chuyện hiện tại, không làm gì cả

        const messageData = {
            senderId: user._id, // ID của người gửi (người dùng hiện tại)
            conversationId: currentChat._id, // ID của cuộc trò chuyện hiện tại
            text: newMessage, // Nội dung tin nhắn mới
        };

        try {
            // Gọi API để gửi tin nhắn
            const response = await sendMessage(messageData);
            setMessages((prevMessages) => [...prevMessages, response.data]);
            // Gửi tin nhắn mới đến server qua socket
            socket.emit('send_message', {
                ...messageData,
                receiverId: currentChat.members.find((member) => member !== user._id), // Tìm ID của người nhận (không phải người gửi)
            });
        } catch (error) {
            console.error('Error sending message:', error); // In lỗi ra console nếu có
        } finally {
            // Không cần làm gì thêm sau khi gửi tin nhắn
        }
    };

  // --- RENDER ---
    return (
    <div className="messages-container">
      {/* CỘT BÊN TRÁI: DANH SÁCH CUỘC TRÒ CHUYỆN */}
      <div className="conversations-panel">
        <h2 className="panel-title">Tin nhắn</h2>
        {loadingConversations ? (
          <p>Đang tải...</p>
        ) : (
          conversations.map((conv) => (
            <div key={conv._id} onClick={() => setCurrentChat(conv)}>
              <ConversationItem 
                conversation={conv} 
                currentUser={user}
                isActive={currentChat?._id === conv._id} // Đánh dấu item đang active
              />
            </div>
          ))
        )}
      </div>

      {/* CỘT BÊN PHẢI: KHUNG CHAT */}
      <div className="chat-panel">
        {currentChat ? (
          <>
            <div className="chat-header">
              {/* Hiển thị thông tin người đang chat cùng */}
              <span>{currentChat.members.find(m => m._id !== user._id)?.username}</span>
            </div>
            
            <div className="chat-messages">
              {loadingMessages ? (
                <p>Đang tải tin nhắn...</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} ref={scrollRef}>
                    <Message 
                      message={msg} 
                      own={msg.sender._id === user._id} 
                    />
                  </div>
                ))
              )}
            </div>
            
            <div className="chat-input-area">
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Chọn một cuộc trò chuyện để bắt đầu nhắn tin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;


