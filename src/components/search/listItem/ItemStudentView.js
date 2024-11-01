import './itemStudentStyles.css';
import { useNavigate } from 'react-router-dom';
import ProfileCircle from '../../profileCircle';

const ItemStudentView = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="view-container2">
      <div className="image2">
        <p>
          {user?.firstName?.[0]?.toUpperCase() || ''}
          {user?.lastName?.[0]?.toUpperCase() || ''}
        </p>
      </div>
      <div className="userInfo2">
        <p className="name-text2">
          {user.firstName} {user.lastName}
        </p>
        <p className="info-text2">
          {user.specialism}, Cohort {user.cohort_id}
        </p>
      </div>
      <div className="button-container2">
        <button className="profile-btn2" onClick={() => navigate(`/profile/${user.id}`)}>
          Profile
        </button>
        <ProfileCircle initials="..." className="edit-icon2" />
      </div>
    </div>
  );
};

export default ItemStudentView;