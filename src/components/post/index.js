import useModal from '../../hooks/useModal';
import Card from '../card';
import Comment from '../comment';
import EditPostModal from '../editPostModal';
import ProfileCircle from '../profileCircle';
import NewComment from '../newComment';
import './style.css';
import { Heart, MessageCircle } from 'react-feather';
import { getComments } from '../../service/apiClient';
import { useState, useEffect } from 'react';

const Post = ({ id, name, date, content, likes = 0 }) => {
  const [allComments, setAllComments] = useState([]);

  const { openModal, setModal } = useModal();

  const userInitials = name.match(/\b(\w)/g);

  const showModal = () => {
    setModal('Edit post', <EditPostModal />);
    openModal();
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result = await getComments(id);
        setAllComments(result);
      } catch (error) {
        console.log('Failed to fetch all comments: ' + error);
      }
    };

    fetchComments();
  }, []);

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
          className={`post-interactions-container border-top ${allComments.length ? 'border-bottom' : null}`}
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
          {allComments.map((comment) => (
            <Comment
              key={comment.id}
              name={
                comment.author.firstName && comment.author.lastName
                  ? `${comment.author.firstName} ${comment.author.lastName}`
                  : 'SAKKI Boiiii'
              }
              content={comment.content}
            />
          ))}
        </section>
        <NewComment postId={id} />
      </article>
    </Card>
  );
};

export default Post;
