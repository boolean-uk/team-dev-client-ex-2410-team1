import ProfileCircle from '../profileCircle';
import './style.css';

const NewComment = ({ postId }) => {
  const userInitials = name.match(/\b(\w)/g);
  // loggedInUser
  return (
    <div className="new-comment">
      <ProfileCircle initials={userInitials} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          placeholder="Add a comment..."
          value={comment.content}
          onChange={handleChange}
          required
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default NewComment;
