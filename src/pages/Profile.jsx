// src/pages/Profile.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook để lấy params từ URL
import { useAuth } from '../context/AuthContext'; // Để lấy token nếu cần

const Profile = () => {
  // Lấy userId từ URL, ví dụ: /profile/123 -> userId là "123"
  const { userId } = useParams(); 
  
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Lấy token để có thể gửi kèm request nếu API yêu cầu

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Gọi API đến backend để lấy thông tin user
        const response = await fetch(
          `https://social-media-backend-90z2.onrender.com/api/users/${userId}`, 
          {
            method: 'GET',
            headers: {
              // Mặc dù route này là public, việc gửi token vẫn là một thói quen tốt
              // phòng trường hợp sau này bạn muốn nó thành private.
              'Authorization': `Bearer ${token}` 
            }
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || 'Không thể tải thông tin người dùng.');
        }

        const data = await response.json();
        setProfileUser(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, token]); // Dependency array: Chạy lại effect nếu userId hoặc token thay đổi

  // Hiển thị trạng thái tải
  if (loading) {
    return <div>Đang tải thông tin profile...</div>;
  }

  // Hiển thị lỗi
  if (error) {
    return <div style={{ color: 'red' }}>Lỗi: {error}</div>;
  }

  // Hiển thị khi không tìm thấy user
  if (!profileUser) {
      return <div>Không tìm thấy người dùng.</div>
  }

  // Hiển thị thông tin profile
  return (
    <div>
      <h2>Trang cá nhân của {profileUser.username}</h2>
      <img src={profileUser.avatar || 'https://i.pravatar.cc/150'} alt={`Avatar của ${profileUser.username}`} style={{ borderRadius: '50%', width: '150px', height: '150px' }} />
      <p><strong>Username:</strong> {profileUser.username}</p>
      <p><strong>Email:</strong> {profileUser.email}</p>
      <p><strong>Tham gia ngày:</strong> {new Date(profileUser.createdAt).toLocaleDateString()}</p>
      {/* Thêm các thông tin khác như bio, followers, following... */}
    </div>
  );
};

export default Profile;