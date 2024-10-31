import useModal from '../../hooks/useModal';
import Card from '../card';
import Comment from '../comment';
import EditPostModal from '../editPostModal';
import ProfileCircle from '../profileCircle';
import './style.css';
import { Heart, MessageCircle } from 'react-feather';

const Post = ({ name, date, content, comments = [], likes = 0 }) => {
  const { openModal, setModal } = useModal();

  const userInitials = name.match(/\b(\w)/g);

  const showModal = () => {
    setModal('Edit post', <EditPostModal />);
    openModal();
  };

  return (
    <Card>
      <article className="post">
        <section className="post-details">
          <ProfileCircle initials={userInitials} />

          <div className="post-user-name">
            <p>{name}</p>
            <small>{date}</small>
          </div>

          <div className="edit-icon">
            <p onClick={showModal}>...</p>
          </div>
        </section>

        <section className="post-content">
          <p>{content}</p>
        </section>

        <section
          className={`post-interactions-container border-top ${comments.length ? 'border-bottom' : null}`}
        >
          <div className="post-interactions">
            <div className="like-btn">
              <Heart size={20} cursor="pointer" />
              <p>Like</p>
            </div>
            <div className="comment-btn">
              <MessageCircle size={20} cursor="pointer" />
              <p>Comment</p>
            </div>
          </div>

          <p>{!likes && 'Be the first to like this'}</p>
        </section>

        <section>
          {comments.map((comment) => (
            <Comment key={comment.id} name={comment.name} content={comment.content} />
          ))}
        </section>
      </article>
    </Card>
  );
};

export default Post;
