// Thông báo
// src/pages/Notifications.jsx
import { useState, useEffect } from 'react';

// Giả lập API: GET /api/notifications
const fetchNotifications = async () => {
    return [
        { id: 1, type: 'like', fromUser: 'thanhle', message: 'đã thích bài viết của bạn.', time: '5 phút trước' },
        { id: 2, type: 'follow', fromUser: 'minhanh', message: 'đã bắt đầu theo dõi bạn.', time: '1 giờ trước' },
        { id: 3, type: 'comment', fromUser: 'hoangpham', message: 'đã bình luận về bài viết của bạn: "Tuyệt vời!"', time: '3 giờ trước' },
    ];
};

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNotifications = async () => {
            const data = await fetchNotifications();
            setNotifications(data);
            setLoading(false);
        };
        loadNotifications();
    }, []);

    if (loading) {
        return <div>Loading notifications...</div>;
    }

    return (
        <div>
            <h1>Thông báo</h1>
            <ul>
                {notifications.map(noti => (
                    <li key={noti.id}>
                        <strong>{noti.fromUser}</strong> {noti.message}
                        <br />
                        <small>{noti.time}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}