import LikeButton from './LikeButton';

export default {
  title: 'Components/LikeButton',
  component: LikeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// Story mặc định
export const Default = {
  args: {
    // props mặc định
    likes: 10,
    isLiked: false,
  },
};

// Story với trạng thái đã like
export const Liked = {
  args: {
    likes: 25,
    isLiked: true,
  },
};

// Story với số like cao
export const HighLikes = {
  args: {
    likes: 9999,
    isLiked: false,
  },
};