import { useEffect, useState } from 'react';
import ProfileCircle from '../profileCircle';

const Avatar = ({ user }) => {
  //   const [thisUser, setThisUser] = useState(null);
  const [userInitials, setUserInitials] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (user) {
      //   setThisUser(user);
      const fullName = `${user.firstName} ${user.lastName}`;
      setName(fullName);
      setUserInitials(fullName.match(/\b(\w)/g)?.join('') || '');
    }
  }, [user]);

  return (
    <>
      <section className="post-details">
        <ProfileCircle initials={userInitials} />
        <div className="post-user-name">
          <p>{name}</p>
          <small>{user?.specialism || 'Software Developer'}</small>
        </div>
      </section>
    </>
  );
};

export default Avatar;
