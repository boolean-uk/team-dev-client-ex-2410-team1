import ProfileCircle from '../profileCircle';
import './style.css';
import { post } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { Send } from 'react-feather';

const NewComment = ({ postId, onCommentAdded }) => {
  const { loggedInUser } = useAuth();
  const userInitials = `${loggedInUser.firstName[0]}${loggedInUser.lastName[0]}`;

  const [content, setContent] = useState('');

  // Handle content change
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  // Function to post a new comment
  const addNewComment = async (commentContent) => {
    try {
      await post(`posts/${postId}/comments`, {
        content: commentContent,
        userId: loggedInUser.id
      });
      setContent(''); // Clear input field after posting
      onCommentAdded();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addNewComment(content);
    }
  };

  return (
    <div className="new-comment">
      <ProfileCircle initials={userInitials} />
      <form className="input-send" onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          placeholder="Add a comment..."
          value={content}
          onChange={handleChange}
        />
        <button type="submit">
          <Send />
        </button>
      </form>
    </div>
  );
};

export default NewComment;
