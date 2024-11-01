import FullLogo from '../../assets/fullLogo';
import useAuth from '../../hooks/useAuth';
import './style.css';
import Card from '../card';
import ProfileIcon from '../../assets/icons/profileIcon';
import CogIcon from '../../assets/icons/cogIcon';
import LogoutIcon from '../../assets/icons/logoutIcon';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
  const { token, onLogout } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { loggedInUser } = useAuth();
  const [userName, setUserName] = useState('');
  const [initials, setInitials] = useState('');
  const [job, setJob] = useState('');
  const [cohort, setCohort] = useState(0);

  useEffect(() => {
    setUserName(loggedInUser.firstName + ' ' + loggedInUser.lastName);
    setInitials(loggedInUser.firstName.charAt(0) + loggedInUser.lastName.charAt(0));
    setJob(loggedInUser.jobTitle || 'Student');
    setCohort(loggedInUser.cohortId || 0);
  }, [loggedInUser]);

  const onClickProfileIcon = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  if (!token) {
    return null;
  }

  return (
    <header>
      <FullLogo textColour="white" />

      <div className="profile-icon" onClick={onClickProfileIcon}>
        <p>{initials}</p>
      </div>

      {isMenuVisible && (
        <div className="user-panel">
          <Card>
            <section className="post-details">
              <div className="profile-icon">
                <p>{initials}</p>
              </div>

              <div className="post-user-name">
                <p>{userName}</p>
                <small>
                  {job}, Cohort {cohort}
                </small>
              </div>
            </section>

            <section className="user-panel-options border-top">
              <ul>
                <li>
                  <NavLink to="/">
                    <ProfileIcon /> <p>Profile</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <CogIcon /> <p>Settings &amp; Privacy</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" onClick={onLogout}>
                    <LogoutIcon /> <p>Log out</p>
                  </NavLink>
                </li>
              </ul>
            </section>
          </Card>
        </div>
      )}
    </header>
  );
};

export default Header;
