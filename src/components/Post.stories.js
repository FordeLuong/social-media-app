import Post from './Post';

export default {
  title: 'Components/Post',
  component: Post,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    author: {
      control: 'text',
      description: 'Tên tác giả bài đăng',
    },
    avatar: {
      control: 'text',
      description: 'URL avatar của tác giả',
    },
    content: {
      control: 'text',
      description: 'Nội dung bài đăng',
    },
    comments: {
      control: 'object',
      description: 'Mảng các comment',
    },
  },
};

// Story mặc định
export const Default = {
  args: {
    author: 'Nguyễn Văn A',
    avatar: 'https://via.placeholder.com/50x50/4285f4/ffffff?text=A',
    content: 'Hôm nay tôi đã học được nhiều điều thú vị về React! Cảm thấy rất hào hứng với những tính năng mới.',
    comments: [
      {
        author: 'Mai Thị B',
        text: 'Bài viết rất hay, cảm ơn bạn đã chia sẻ!'
      },
      {
        author: 'Trần Văn C',
        text: 'Mình cũng đang học React, có thể trao đổi thêm không?'
      }
    ]
  },
};

// Post không có comment
export const NoComments = {
  args: {
    author: 'Lisa Chen',
    avatar: 'https://via.placeholder.com/50x50/ff5722/ffffff?text=L',
    content: 'Chào mọi người! Đây là bài đăng đầu tiên của mình trên platform này 🎉',
    comments: []
  },
};

// Post với nhiều comment
export const ManyComments = {
  args: {
    author: 'John Developer',
    avatar: 'https://via.placeholder.com/50x50/2196f3/ffffff?text=J',
    content: 'Vừa hoàn thành project React đầu tiên! Cảm ơn community đã hỗ trợ nhiệt tình.',
    comments: [
      {
        author: 'Sarah',
        text: 'Chúc mừng bạn! 🎊'
      },
      {
        author: 'Mike',
        text: 'Tuyệt vời! Có thể share source code không?'
      },
      {
        author: 'Anna',
        text: 'Đã theo dõi journey của bạn từ đầu, rất tự hào!'
      },
      {
        author: 'David',
        text: 'Keep up the good work! 💪'
      },
      {
        author: 'Jenny',
        text: 'Bạn có thể viết tutorial không? Mình đang muốn học React.'
      }
    ]
  },
};

// Post với nội dung dài
export const LongContent = {
  args: {
    author: 'Tech Blogger',
    avatar: 'https://via.placeholder.com/50x50/9c27b0/ffffff?text=T',
    content: 'Hôm nay mình muốn chia sẻ về trải nghiệm học React trong 6 tháng qua. Đây là một hành trình đầy thú vị với rất nhiều thử thách. Từ việc hiểu về JSX, state management, đến các hooks như useState, useEffect... Mỗi concept đều mang lại những bài học quý giá. Đặc biệt, việc làm project thực tế đã giúp mình consolidate kiến thức rất nhiều.',
    comments: [
      {
        author: 'Learner123',
        text: 'Cảm ơn bạn đã chia sẻ! Mình cũng đang trong quá trình học React.'
      },
      {
        author: 'ReactFan',
        text: 'Hooks thực sự là game changer! Đồng ý với bạn về việc làm project thực tế.'
      }
    ]
  },
};

// Post với comment dài
export const LongComments = {
  args: {
    author: 'Question Asker',
    avatar: 'https://via.placeholder.com/50x50/4caf50/ffffff?text=Q',
    content: 'Có ai biết cách optimize performance trong React không? Mình đang gặp vấn đề với re-rendering.',
    comments: [
      {
        author: 'React Expert',
        text: 'Bạn có thể sử dụng React.memo để tránh unnecessary re-renders. Ngoài ra, useMemo và useCallback cũng rất hữu ích cho việc memoize expensive calculations và functions. Đặc biệt chú ý đến dependency arrays để tránh stale closures.'
      },
      {
        author: 'Performance Guru',
        text: 'Thêm vào đó, hãy sử dụng React DevTools Profiler để identify performance bottlenecks. Code splitting với React.lazy cũng giúp giảm bundle size đáng kể.'
      }
    ]
  },
};

// Post với emoji và ký tự đặc biệt
export const WithEmojis = {
  args: {
    author: 'Emoji Lover 😍',
    avatar: 'https://via.placeholder.com/50x50/ff9800/ffffff?text=😊',
    content: 'Cuối tuần vui vẻ mọi người! 🎉 Ai có kế hoạch gì thú vị không? 🤔',
    comments: [
      {
        author: 'Weekend Warrior',
        text: 'Mình sẽ đi hiking! 🏔️ Bạn thì sao?'
      },
      {
        author: 'Coder Life',
        text: 'Code cả ngày! 💻😅 #developerlife'
      },
      {
        author: 'Foodie',
        text: 'Thử món mới! 🍜🍕 Có ai muốn join không?'
      }
    ]
  },
};

// Post với tên tác giả dài và avatar khác
export const LongAuthorName = {
  args: {
    author: 'Nguyễn Thị Minh Châu Developer',
    avatar: 'https://via.placeholder.com/50x50/e91e63/ffffff?text=MC',
    content: 'Chia sẻ một tip nhỏ khi làm việc với React hooks!',
    comments: [
      {
        author: 'Curious Student',
        text: 'Tip gì vậy bạn? Mình đang muốn học thêm về hooks!'
      }
    ]
  },
};

// Post edge case - nội dung rất ngắn
export const ShortContent = {
  args: {
    author: 'Brief User',
    avatar: 'https://via.placeholder.com/50x50/607d8b/ffffff?text=B',
    content: 'Hi! 👋',
    comments: [
      {
        author: 'Friendly Reply',
        text: 'Hello there! 😊'
      },
      {
        author: 'Wave Back',
        text: '👋👋👋'
      }
    ]
  },
};