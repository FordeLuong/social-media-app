// Tin nhắn
// src/pages/Messages.jsx
import { useState, useEffect } from 'react';

// Giả lập API: GET /api/messages
const fetchConversations = async () => {
    return [
        { id: 1, withUser: 'thanhle', lastMessage: 'Ok, hẹn gặp bạn sau nhé!', unread: true },
        { id: 2, withUser: 'minhanh', lastMessage: 'Bạn đã xem tài liệu mình gửi chưa?', unread: false },
        { id: 3, withUser: 'hoangpham', lastMessage: 'Cảm ơn bạn nhiều!', unread: false },
    ];
};

export default function Messages() {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadConversations = async () => {
            const data = await fetchConversations();
            setConversations(data);
            setLoading(false);
        };
        loadConversations();
    }, []);

    if (loading) {
        return <div>Loading messages...</div>;
    }

    return (
        <div>
            <h1>Tin nhắn</h1>
            <ul>
                {conversations.map(conv => (
                    <li key={conv.id} style={{ fontWeight: conv.unread ? 'bold' : 'normal' }}>
                        <div>{conv.withUser}</div>
                        <div>{conv.lastMessage}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}