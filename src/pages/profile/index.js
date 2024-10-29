import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Avatar from '../../components/avatar';
import { get } from '../../service/apiClient';

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await get(`users/${id}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <Avatar user={user} />
          <p>ID: {user.id}</p>
          <p>Role: {user.role}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
