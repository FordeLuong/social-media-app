// src/hooks/useSocket.js
import { useContext } from 'react';
// Import context từ file của nó
import { SocketContext } from '../context/SocketContext';

export const useSocket = () => {
  return useContext(SocketContext);
};