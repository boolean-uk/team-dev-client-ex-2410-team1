import ProfileCircle from '../profileCircle';
import './style.css';
import EditCommentModal from '../editCommentModal';
import useModal from '../../hooks/useModal';

const Comment = ({ name, content }) => {
  const { openModal, setModal } = useModal();

  const userInitials = name.match(/\b(\w)/g);
  const showModal = () => {
    setModal('Edit comment', <EditCommentModal />);
    openModal();
  };
  return (
    <div className="comment-box">
      <ProfileCircle initials={userInitials} />
      <div className="comment-container">
        <h6>{name}</h6>
        <p>{content}</p>
      </div>
      <div className="edit-icon">
        <p onClick={showModal}>...</p>
      </div>
    </div>
  );
};

export default Comment;
