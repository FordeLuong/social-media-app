// Trang newsfeed

// src/pages/Home.jsx

import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post'; // Component để hiển thị một bài post
import './css/Home.css'; // File CSS cho trang Home

// Dữ liệu giả lập (mock data) cho các bài post.
// Trong dự án thật, bạn sẽ dùng useEffect để gọi API và lấy dữ liệu này từ server.
const mockPosts = [
    {
        id: 1,
        author: {
            name: 'Coder Việt',
            avatar: 'https://i.pravatar.cc/150?img=1', // Dùng ảnh ngẫu nhiên
        },
        content: 'Vừa hoàn thành xong chức năng authentication bằng React Context. Cảm giác thật tuyệt vời!',
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
        timestamp: '5 giờ trước',
        likes: 152,
        comments: 18,
    },
    {
        id: 2,
        author: {
            name: 'Jane Doe',
            avatar: 'https://i.pravatar.cc/150?img=2',
        },
        content: 'Một buổi chiều cuối tuần thư giãn bên ly cà phê và những dòng code.',
        imageUrl: null, // Bài post không có ảnh
        timestamp: '1 ngày trước',
        likes: 89,
        comments: 7,
    },
    {
        id: 3,
        author: {
            name: 'John Smith',
            avatar: 'https://i.pravatar.cc/150?img=3',
        },
        content: 'React Hooks đã thay đổi cách chúng ta viết component. Mọi người thích nhất hook nào?',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
        timestamp: '2 ngày trước',
        likes: 340,
        comments: 45,
    }
];



const Home = () => {
    // Trong tương lai, bạn sẽ dùng useState và useEffect ở đây để lấy data
    // const [posts, setPosts] = useState([]);
    // useEffect(() => {
    //   // gọi API lấy posts...
    //   // setPosts(dataFromApi);
    // }, []);
    const [posts, setPosts] = useState(null); 
    const [loading, setLoading] = useState(true); 

    if (loading) {
        return <div>Đang tải bài viết...</div>; // Hiển thị thông báo loading
    }

    if (!posts || posts.length === 0) {
        return <div>Chưa có bài viết nào.</div>; // Hiển thị khi không có bài viết
    }  

    return (
        // Chỉ cần trả về JSX hiển thị dữ liệu
        <div className="post-list">
            <div className="create-post-placeholder">
                <img src="https://i.pravatar.cc/150?img=5" alt="User Avatar" className="create-post-avatar" />
                <input type="text" placeholder="Bạn đang nghĩ gì?" readOnly />
            </div>

            {mockPosts.map((post) => (
                <Post key={post.id} postData={post} />
            ))}
        </div>
    );
}

export default Home;