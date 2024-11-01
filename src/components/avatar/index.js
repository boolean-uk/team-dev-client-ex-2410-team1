import { useEffect, useState } from 'react';
import ProfileCircle from '../profileCircle';

import './styles.css';

const Avatar = ({ user }) => {
  const [userInitials, setUserInitials] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (user) {
      const fullName = `${user.firstName} ${user.lastName}`;
      setName(fullName);
      setUserInitials(fullName.match(/\b(\w)/g)?.join('') || '');
    }
  }, [user]);

  return (
    <>
      <section className="post-details">
        <ProfileCircle initials={userInitials} imageUrl={user.imageUrl} />
        <div className="post-user-name">
          <p>{name}</p>
          <small>{user?.specialism || 'Software Developer'}</small>
        </div>
      </section>
    </>
  );
};

export default Avatar;
