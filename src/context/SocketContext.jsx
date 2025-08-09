// src/context/SocketContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

// 1. Tạo context để chia sẻ socket instance
export const SocketContext = createContext();

// 2. TẠO VÀ EXPORT CUSTOM HOOK `useSocket` (PHẦN BỊ THIẾU)
// Hook này là một cách viết tắt gọn gàng để component con
// có thể truy cập vào giá trị của SocketContext.
export const useSocket = () => {
  return useContext(SocketContext);
};


// 3. Tạo Provider component (Phần này của bạn đã đúng)
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_SOCKET_URL);
      setSocket(newSocket);
      newSocket.emit('addUser', user._d); // Chú ý: có thể là user._id

      return () => {
        newSocket.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};