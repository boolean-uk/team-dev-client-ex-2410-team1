import { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/header';
import Modal from '../components/modal';
import Navigation from '../components/navigation';
import useAuth from '../hooks/useAuth';
import { createProfile, login, register } from '../service/apiClient';

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (token) {
      const redirectPath = localStorage.getItem('redirectPath');
      if (redirectPath) {
        localStorage.removeItem('redirectPath');
        navigate(redirectPath);
      } else {
        navigate('/');
      }
    }
  }, [token]);

  const handleLogin = async (email, password) => {
    const res = await login(email, password);

    if (!res.data.token) {
      return navigate('/login');
    }

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('loggedInUser', JSON.stringify(res.data));

    setToken(res.data.token);
    setLoggedInUser(res.data);

    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');

    setToken(null);
    setLoggedInUser(null);
  };

  const handleRegister = async (email, password) => {
    const res = await register(email, password);
    setToken(res.data.token);

    localStorage.setItem('loggedInUser', JSON.stringify(res.data));
    setLoggedInUser(res.data);

    localStorage.setItem('redirectPath', '/verification');
    navigate('/verification');
  };

  const handleCreateProfile = async (
    firstName,
    lastName,
    username,
    githubUsername,
    mobile,
    bio
  ) => {
    const { userId } = jwt_decode(token);

    await createProfile(userId, firstName, lastName, username, githubUsername, mobile, bio);

    const existingUserString = localStorage.getItem('loggedInUser');
    let existingUser = {};
    if (existingUserString) {
      existingUser = JSON.parse(existingUserString);
    }

    const updatedUser = {
      ...existingUser,
      firstName,
      lastName,
      username,
      githubUsername,
      mobile,
      bio
    };

    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    setLoggedInUser(updatedUser);

    localStorage.setItem('token', token);
    navigate('/');
  };

  const value = {
    token,
    loggedInUser,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onCreateProfile: handleCreateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    if (!localStorage.getItem('redirectPath')) {
      localStorage.setItem('redirectPath', location.pathname);
    }
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Modal />
      {children}
    </div>
  );
};

export { AuthContext, AuthProvider, ProtectedRoute };
