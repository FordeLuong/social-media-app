// src/pages/Profile.jsx

import React, { useState, useEffect, ú } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserProfile, getUserPosts } from '../services/userService'; // 1. Import hàm từ service
import Feed  from '../components/Feed';
import { useAuth } from '../context/AuthContext';
import {followUser, unfollowUser} from '../services/userService'; // Import các hàm follow/unfollow nếu cần
import { createConversation } from '../services/conversationService'; 

const Profile = () => {
  const { userId } = useParams(); 
  const navigate = useNavigate();
  const { user: currentUser } = useAuth(); // Lấy thông tin người dùng hiện tại từ context
  
  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // Thêm state để lưu bài đăng của user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false); // Thêm state để theo dõi trạng thái follow


  const isOwnProfile = currentUser && currentUser._id === userId; // Kiểm tra xem có phải là trang cá nhân của người dùng hiện tại
  // Không cần lấy token từ context nữa vì axios interceptor sẽ tự động đính kèm
  // const { token } = useAuth(); 
  console.log("Rendering Profile page...");
  console.log("userId from URL:", userId);
  console.log("currentUser from Context:", currentUser);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Logic try...catch...finally giữ nguyên, rất tốt!
      try {
        setLoading(true);
        setError(null);

        // // 2. Gọi API một cách gọn gàng qua hàm service
        // const response = await getUserProfile(userId);
        // Sử dụng promise để fetch cả 2 api cùng lúc
        const [profileResponse, postsResponse] = await Promise.all([
          getUserProfile(userId),
          getUserPosts(userId) // Gọi hàm lấy bài đăng của user
        ]);

        // Dữ liệu trả về nằm trong response.data
        setProfileUser(profileResponse.data);
        setUserPosts(postsResponse.data); // Lưu bài đăng của user vào state
        
        if (currentUser && profileResponse.data.followers.includes(currentUser._id)) {
          setIsFollowing(true); // Nếu người dùng hiện tại đã theo dõi user này
        } else {
          setIsFollowing(false); // Nếu không theo dõi
        }
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

  }, [userId, currentUser]); // 3. Bỏ token khỏi dependency array

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
  const handleFollowToggle = async () => {
      if (!userId) return alert("Vui lòng đăng nhập.");

      try {
          if (isFollowing) {
              await unfollowUser(userId);
              // Cập nhật UI
              setProfileUser(prev => ({ ...prev, followers: prev.followers.filter(id => id !== currentUser._id) }));
          } else {
              await followUser(userId);
              // Cập nhật UI
              setProfileUser(prev => ({ ...prev, followers: [...prev.followers, currentUser._id] }));
          }
          setIsFollowing(!isFollowing); // Đảo ngược trạng thái
      } catch (error) {
          console.error("Lỗi khi follow/unfollow:", error);
      }
  };

  const handleSendMessage = async () => {
    if (!currentUser) {
      return alert("Vui lòng đăng nhập để gửi tin nhắn.");
    }
    try {
      // Gọi API để tạo (hoặc lấy) cuộc trò chuyện giữa currentUser và profileUser
      const response = await createConversation(profileUser._id);
      const conversation = response.data;
      
      // Sau khi có cuộc trò chuyện, điều hướng người dùng đến trang Messages
      // và truyền ID của cuộc trò chuyện qua state để trang Messages có thể mở nó ra
      navigate('/messages', { state: { conversationId: conversation._id } });

    } catch (error) {
      console.error("Lỗi khi tạo cuộc trò chuyện:", error);
      alert("Không thể bắt đầu cuộc trò chuyện, vui lòng thử lại.");
    }
  };

  return (
    <div className='profile-container'>
      <header className='profile-header'>
        <img 
          src={profileUser.avatar || `https://i.pravatar.cc/150?u=${profileUser._id}`} 
          alt={`Avatar của ${profileUser.username}`} 
          className='profile-avatar' 
        />
        <div className='profile-info'>
          <h2 className='profile-username'>{profileUser.username}</h2>
          <p className='profile-bio'>{profileUser.bio || 'Chưa có mô tả.'}</p>
          <p className='profile-joined'>Tham gia từ: {new Date(profileUser.createdAt).toLocaleDateString()}</p>
          <p className='profile-posts-count'>Số bài đăng: {userPosts.length}</p>
          <p className='profile-followers-count'>Người theo dõi: {profileUser.followers.length}</p>
          <p className='profile-following-count'>Đang theo dõi: {profileUser.following.length}</p>
        </div>
        <div className='profile-actions'>
          {isOwnProfile ? (
            <Link to="/accounts/edit" className='edit-profile-button'>
                Chỉnh sửa hồ sơ
            </Link>
          ) : (
            <>
            <button 
              className={`follow-button ${isFollowing ? 'following' : ''}`}
              onClick={handleFollowToggle}
            >
              {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
            </button>

            <button 
              className='message-button'
              onClick={handleSendMessage}
            >
              Nhắn tin
            </button>

            </>
          )}
        </div>
      </header>

      <hr className='profile-divider' />

      <main className='profile-posts'>
        <h3>Bài đăng của {profileUser.username}</h3>
        <Feed posts={userPosts} loading={false} error={null} />
      </main>
    </div>
  );
};

export default Profile;