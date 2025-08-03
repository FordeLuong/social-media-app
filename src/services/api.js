// src/services/api.js

import axios from 'axios';

// 1. Tạo một instance của axios với cấu hình cơ sở
const api = axios.create({
  // 2. Lấy URL của backend từ biến môi trường của React
  // Đảm bảo bạn đã có file .env ở thư mục gốc của frontend
  // và biến này phải bắt đầu bằng REACT_APP_
  baseURL: import.meta.env.VITE_API_URL,
});

/* 
  3. Sử dụng Axios Interceptor (Người gác cổng)
  Đây là một chức năng cực kỳ mạnh mẽ. Nó sẽ "chặn" mọi request trước khi
  request đó được gửi đi để chúng ta có thể chỉnh sửa nó (ví dụ: thêm token).
*/
api.interceptors.request.use(
  (config) => {
    // Đoạn mã này sẽ chạy cho MỌI request gửi đi từ instance 'api' này

    // Lấy token từ localStorage (chúng ta sẽ lưu nó vào đây sau khi đăng nhập)
    const token = localStorage.getItem('token');
    
    // Nếu có token trong localStorage...
    if (token) {
      // ...thì thêm một header tên là 'Authorization' vào request
      // với giá trị là 'Bearer <token>'
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Trả về đối tượng config đã được sửa đổi để request tiếp tục được gửi đi
    return config; 
  },
  (error) => {
    // Xử lý lỗi nếu quá trình thiết lập request gặp vấn đề
    return Promise.reject(error);
  }
);

// 4. Export instance đã được cấu hình để các file service khác có thể sử dụng
export default api;