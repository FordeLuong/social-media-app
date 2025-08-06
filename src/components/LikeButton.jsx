// Nút like
import React, { useEffect, useState } from "react";
import './css/LikeButton.css';
import { useAuth } from '../context/AuthContext.jsx'; 
import { likePost } from '../services/postService'; // Giả sử bạn có các hàm này trong postService

function LikeButton({ postId, initialLikes }) {
    // useState để quản lý hai trạng thái:
    // 1. isLiked: người dùng đã nhấn nút like hay chưa (boolean)
    // 2. likeCount: tổng số lượt thích (number)
    const { user } = useAuth(); // Lấy thông tin người dùng từ context

    const [likes, setLikes] = useState(initialLikes || []);
    const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Kiểm tra xem người dùng đã like bài viết này chưa
        if (user && likes.includes(user._id)) {
            setIsLikedByCurrentUser(true);
        } else {
            setIsLikedByCurrentUser(false);
        }
    }, [user, likes]);

    const handleLikeClick = async () => {
        //Khi nhấn nút, đảo ngược trạng thái isLiked

        if (isLoading) return; // Nếu đang xử lý, không làm gì cả
        setIsLoading(true);
        // Dựa vào trạng thái SẮP TỚI của isLiked để tăng/giảm count
        if (isLikedByCurrentUser) {
            // Chuẩn bị unlike
            setIsLikedByCurrentUser(false);
            setLikes(prevLikes => prevLikes.filter(id => id !== user._id));
        } else {
            // Chuẩn bị like
            setIsLikedByCurrentUser(true);
            setLikes(prevLikes => [...prevLikes, user._id]);
        }

        try {
            // Gọi API ở background
            await likePost(postId);
            // Nếu thành công thì không cần làm gì, UI đã được cập nhật "lạc quan"
        } catch (error) {
            console.error("Lỗi khi thích bài viết:", error);
            // Nếu API thất bại, đảo ngược lại thay đổi trên UI để đồng bộ với server
            if (isLikedByCurrentUser) {
                setIsLikedByCurrentUser(true);
                setLikes(prevLikes => [...prevLikes, user._id]);
            } else {
                setIsLikedByCurrentUser(false);
                setLikes(prevLikes => prevLikes.filter(id => id !== user._id));
            }
            alert("Đã có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button 
            onClick={handleLikeClick} 
            className={`like-button ${isLikedByCurrentUser  ? 'liked' : ''}`}
            disabled={isLoading}
        >
            {isLikedByCurrentUser  ? '❤️ Đã thích' : '👍 Thích'} ({likes.length})
        </button>
    );
}

export default LikeButton;