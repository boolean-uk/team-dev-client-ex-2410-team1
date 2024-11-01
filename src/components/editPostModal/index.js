import { useEffect, useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';
import Button from '../button';
import useAuth from '../../hooks/useAuth';

const EditPostModal = () => {
  const { closeModal } = useModal();
  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');

  const { loggedInUser } = useAuth();
  const [userName, setUserName] = useState('');
  const [initials, setInitials] = useState('');

  useEffect(() => {
    setUserName(loggedInUser.firstName + ' ' + loggedInUser.lastName[0]);
    setInitials(loggedInUser.firstName.charAt(0) + loggedInUser.lastName.charAt(0));
  }, [loggedInUser]);

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
          <p>{initials}</p>
        </div>
        <div className="post-user-name">
          <p>{userName}</p>
        </div>
      </section>

      <section>
        <textarea onChange={onChange} value={text} placeholder="Edit your post"></textarea>
      </section>

      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text="Post"
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default EditPostModal;
