import { useState } from 'react';
import useModal from '../../hooks/useModal';
import '../editPostModal/style.css';
import Button from '../button';
import useAuth from '../../hooks/useAuth';

const EditCommentModal = () => {
  const { closeModal } = useModal();
  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');
  const { loggedInUser } = useAuth();
  const userInitials = `${loggedInUser.firstName[0]}${loggedInUser.lastName[0]}`;

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = () => {
    setMessage('Submit button was clicked! Closing modal in 2 seconds...');

    setTimeout(() => {
      setMessage(null);
      closeModal();
    }, 2000);
  };

  return (
    <>
      <section className="create-post-user-details">
        <div className="profile-icon">
          <p>{userInitials}</p>
        </div>
        <div className="post-user-name">
          <p>
            {loggedInUser.firstName} {loggedInUser.lastName}
          </p>
        </div>
      </section>

      <section>
        <textarea onChange={onChange} value={text} placeholder="Edit your comment"></textarea>
      </section>

      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text="Send"
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default EditCommentModal;
