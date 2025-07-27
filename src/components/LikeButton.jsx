// Nút like
import React, { useState } from "react";
import './css/LikeButton.css';

function LikeButton() {
    // useState để quản lý hai trạng thái:
    // 1. isLiked: người dùng đã nhấn nút like hay chưa (boolean)
    // 2. likeCount: tổng số lượt thích (number)
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));

    const handleLikeClick = () => {
        //Khi nhấn nút, đảo ngược trạng thái isLiked
        setIsLiked(!isLiked);

        // Dựa vào trạng thái SẮP TỚI của isLiked để tăng/giảm count
        if(!isLiked) {
            setLikeCount(likeCount + 1);
        } else {
            setLikeCount(likeCount - 1);
        }
    };

    return (
        <button onClick={handleLikeClick} className={`like-button ${isLiked ? 'liked' : ''}`}>
            {isLiked ? '❤️ Đã thích' : '👍 Thích'} ({likeCount})
        </button>
    );
}

export default LikeButton;