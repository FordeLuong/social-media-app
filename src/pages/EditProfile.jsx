// src/pages/EditProfile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import './css/EditProfile.css';

const EditProfile = () => {
  const { user: currentUser, login } = useAuth();
  const navigate = useNavigate();
  
  // State đã đúng, giữ nguyên với realName
  const [formData, setFormData] = useState({
    email: '',
    realName: '',
    avatar: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        // Lấy realName từ currentUser, nếu không có thì lấy username
        realName: currentUser.realName || currentUser.username || '',
        email: currentUser.email || '',
        avatar: currentUser.avatar || '',
        bio: currentUser.bio || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Chuẩn bị payload, không gửi email vì không cho sửa
      const payload = {
        realName: formData.realName,
        avatar: formData.avatar,
        bio: formData.bio,
      };

      const response = await updateUserProfile(payload);
      
      login(localStorage.getItem('token'), response.data); 

      alert("Cập nhật thành công!");
      navigate(`/profile/${currentUser._id}`);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Cập nhật thất bại.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return <div>Đang tải...</div>;

  return (
    <div className="edit-profile-container">
      <h2>Chỉnh sửa trang cá nhân</h2>
      <form onSubmit={handleSubmit}>
        <label>Ảnh đại diện (URL)</label>
        <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} />
        
        {/* Input cho realName */}
        <label>Tên hiển thị</label>
        <input type="text" name="realName" value={formData.realName} onChange={handleChange} required />
        
        <label>Tiểu sử</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} maxLength="150" />
        
        {/* Hiển thị username, không cho sửa */}
        <label>Tên người dùng (không thể thay đổi)</label>
        <input type="text" name="username" value={currentUser.username} disabled />
        
        <label>Email (không thể thay đổi)</label>
        <input type="email" name="email" value={formData.email} disabled />

        <button type="submit" disabled={loading}>
          {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;