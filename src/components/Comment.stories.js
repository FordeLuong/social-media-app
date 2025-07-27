import Comment from './Comment';

export default {
  title: 'Components/Comment',
  component: Comment,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    author: {
      control: 'text',
      description: 'Tên tác giả của comment',
    },
    text: {
      control: 'text',
      description: 'Nội dung comment',
    },
  },
};

// Story mặc định
export const Default = {
  args: {
    author: 'Nguyễn Văn A',
    text: 'Bài viết rất hay và bổ ích!'
  },
};

// Comment ngắn
export const Short = {
  args: {
    author: 'Mai',
    text: 'Like!'
  },
};

// Comment dài
export const Long = {
  args: {
    author: 'Trần Thị B',
    text: 'Cảm ơn bạn đã chia sẻ bài viết này. Tôi đã học được rất nhiều điều bổ ích từ nội dung này. Hy vọng bạn sẽ tiếp tục đăng những bài viết chất lượng như vậy.'
  },
};

// Comment với tên tác giả dài
export const LongAuthorName = {
  args: {
    author: 'Nguyễn Thị Minh Châu',
    text: 'Bài viết rất chi tiết và dễ hiểu.'
  },
};

// Comment với emoji
export const WithEmoji = {
  args: {
    author: 'Alex',
    text: 'Amazing content! 🔥👏 Keep it up! 💪'
  },
};

// Comment với mention
export const WithMention = {
  args: {
    author: 'David',
    text: '@john_doe bạn nên đọc bài này, rất hữu ích đấy!'
  },
};

// Comment với ký tự đặc biệt
export const WithSpecialCharacters = {
  args: {
    author: 'Hùng',
    text: 'Tỷ lệ tăng trưởng 15% & hiệu suất >90% thật ấn tượng!'
  },
};

// Comment rỗng (edge case)
export const Empty = {
  args: {
    author: 'Anonymous',
    text: ''
  },
};

// Comment với line break (nếu hỗ trợ)
export const MultiLine = {
  args: {
    author: 'Lisa',
    text: 'Dòng đầu tiên.\nDòng thứ hai.\nDòng cuối cùng.'
  },
};