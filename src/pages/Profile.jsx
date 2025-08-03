// src/pages/Profile.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../services/userService'; // 1. Import hàm từ service

const Profile = () => {
  const { userId } = useParams(); 
  
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Không cần lấy token từ context nữa vì axios interceptor sẽ tự động đính kèm
  // const { token } = useAuth(); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Logic try...catch...finally giữ nguyên, rất tốt!
      try {
        setLoading(true);
        setError(null);

        // 2. Gọi API một cách gọn gàng qua hàm service
        const response = await getUserProfile(userId);

        // Dữ liệu trả về nằm trong response.data
        setProfileUser(response.data);

      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Không thể tải thông tin người dùng.';
        setError(errorMessage);
        console.error("Lỗi khi tải profile:", err);
      } finally {
        setLoading(false);
      }
    };

    // Chỉ fetch khi có userId
    if (userId) {
        fetchUserProfile();
    }

  }, [userId]); // 3. Bỏ token khỏi dependency array

  // --- Phần JSX hiển thị giữ nguyên, đã rất tốt ---

  if (loading) {
    return <div>Đang tải thông tin profile...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Lỗi: {error}</div>;
  }

  if (!profileUser) {
      return <div>Không tìm thấy người dùng.</div>
  }

  return (
    <div>
      <h2>Trang cá nhân của {profileUser.username}</h2>
      <img 
        src={profileUser.avatar || `https://i.pravatar.cc/150?u=${profileUser._id}`} // Thêm id để ảnh ngẫu nhiên cố định cho mỗi user
        alt={`Avatar của ${profileUser.username}`} 
        style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }} 
      />
      <p><strong>Username:</strong> {profileUser.username}</p>
      <p><strong>Email:</strong> {profileUser.email}</p>
      <p><strong>Tham gia ngày:</strong> {new Date(profileUser.createdAt).toLocaleDateString('vi-VN')}</p>
      
      {/* Trong tương lai, bạn có thể thêm các bài đăng của người dùng này ở đây */}
    </div>
  );
};

export default Profile;