import './itemStyles.css';
import { useNavigate } from 'react-router-dom';

const ItemTeacherView = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="view-container">
      <div className="image">
        <p>
          {user?.firstName?.[0]?.toUpperCase() || ''}
          {user?.lastName?.[0]?.toUpperCase() || ''}
        </p>
      </div>
      <div className="userInfo">
        <p className="name-text">
          {user.firstName} {user.lastName}
        </p>
        <p className="info-text">
          {user.specialism}, Cohort {user.cohort_id}
        </p>
      </div>
      <div className="button-container">
        <button className="profile-btn" onClick={() => navigate(`/profile/${user.id}`)}>
          Profile
        </button>

        <button className="profile-btn" onClick={() => navigate('/neeedToBeNotes')}>
          Add Note
        </button>

        <button className="profile-btn" onClick={() => navigate('/neeedToBeProfile')}>
          Move to cohort
        </button>

        <p className="dotdot-btn" onClick={() => console.log('Modal')}>
          ...
        </p>
        {/* Opens modal, see figma */}
      </div>
    </div>
  );
};

export default ItemTeacherView;
