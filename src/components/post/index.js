import useModal from '../../hooks/useModal';
import Card from '../card';
import Comment from '../comment';
import EditPostModal from '../editPostModal';
import ProfileCircle from '../profileCircle';
import NewComment from '../newComment';
import './style.css';
import { Heart, MessageSquare } from 'react-feather';
import { getComments } from '../../service/apiClient';
import { useState, useEffect } from 'react';

const Post = ({ id, name, date, content, likes = 0 }) => {
  const [allComments, setAllComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const commentsToDisplay = showAllComments ? allComments : allComments.slice(0, 3);
  const [isRed, setIsRed] = useState(false);
  const [allLikes, setAllLikes] = useState(likes);

  const { openModal, setModal } = useModal();

  const userInitials = name.match(/\b(\w)/g);

  const showModal = () => {
    setModal('Edit post', <EditPostModal />);
    openModal();
  };

  const fetchComments = async () => {
    try {
      const result = await getComments(id);
      setAllComments(result);
    } catch (error) {
      console.log('Failed to fetch all comments: ' + error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const toggleColor = () => {
    setIsRed(!isRed);
    setAllLikes((prevLikes) => (prevLikes === 0 ? 1 : prevLikes + 1));
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-GB', { month: 'long' });
    const time = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    return `${day} ${month} at ${time}`;
  };

  return (
    <Card>
      <article className="post">
        <section className="post-details">
          <ProfileCircle initials={userInitials} />

          <div className="post-user-name">
            <p>{name}</p>
            <small>{formatDate(date)}</small>
          </div>

          <div className="edit-icon">
            <p onClick={showModal}>...</p>
          </div>
        </section>

        <section className="post-content">
          <p>{content}</p>
        </section>

        <section
          className={`post-interactions-container border-top ${allComments.length ? 'border-bottom' : null}`}
        >
          <div className="post-interactions">
            <div className="like-btn">
              <Heart
                size={20}
                cursor="pointer"
                onClick={toggleColor}
                fill={isRed ? 'red' : 'white'}
              />

              <div className="btn-text">
                <p>Like</p>
              </div>
            </div>
            <div className="comment-btn">
              <MessageSquare size={20} cursor="pointer" />
              <div className="btn-text">
                <p>Comment</p>
              </div>
            </div>
          </div>

          <p>
            {allLikes === 0
              ? 'Be the first to like this'
              : `${allLikes} ${allLikes > 1 ? 'likes' : 'like'}`}
          </p>
        </section>

        <div className="comment-section">
          {allComments.length > 3 && (
            <p
              className="link"
              onClick={() => setShowAllComments((prev) => !prev)}
              style={{ cursor: 'pointer' }}
            >
              {showAllComments ? `Hide comments` : `See all comments (${allComments.length})`}
            </p>
          )}

          {commentsToDisplay.map((comment) => (
            <Comment
              key={comment.id}
              name={`${comment.author.firstName} ${comment.author.lastName}`}
              content={comment.content}
            />
          ))}
        </div>

        <NewComment postId={id} onCommentAdded={fetchComments} />
      </article>
    </Card>
  );
};

export default Post;
