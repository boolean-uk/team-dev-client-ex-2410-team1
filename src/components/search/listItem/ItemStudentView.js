import './itemStyles.css';
import { useNavigate } from 'react-router-dom';

const ItemStudentView = () => {
  // fetch students from the database
  const navigate = useNavigate();

  return (
    <div className="view-container">
      <div className="image">
        <p>AJ</p>
      </div>
      <div className="userInfo">
        <p className="name-text">NAME NAME</p>
        <p className="info-text">SEPCIALISM, COHORT</p>
      </div>
      <div className="button-container">
        <button className="profile-btn" onClick={() => navigate('/neeedToBeProfile')}>
          Profile
        </button>
        <button className="dotdot-btn">...</button>
        {/* Opens modal, see figma */}
      </div>
    </div>
  );
};

export default ItemStudentView;
