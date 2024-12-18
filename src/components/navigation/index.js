import { NavLink } from 'react-router-dom';
import CohortIcon from '../../assets/icons/cohortIcon';
import HomeIcon from '../../assets/icons/homeIcon';
import ProfileIcon from '../../assets/icons/profileIcon';
import useAuth from '../../hooks/useAuth';
import './style.css';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const Navigation = () => {
  const { token } = useAuth();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    setUserID(jwtDecode(token).userId);
  }, []);

  if (!token) {
    return null;
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            <HomeIcon colour="#000046" />
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${userID}`}>
            <ProfileIcon />
            <p>Profile</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/cohort">
            <CohortIcon />
            <p>Cohort</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
