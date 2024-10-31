import ProfileCircle from '../profileCircle';
import './style.css';

const Comment = ({ name, content }) => {
  const userInitials = name.match(/\b(\w)/g);

  return (
    <div className="comment-box">
      <ProfileCircle initials={userInitials} />
      <div className="comment-container">
        <h6>{name}</h6>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Comment;
