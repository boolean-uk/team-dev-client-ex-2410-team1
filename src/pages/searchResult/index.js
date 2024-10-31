import { useLocation, useNavigate } from 'react-router-dom';
import ItemStudentView from '../../components/search/listItem/ItemStudentView';
import './style.css';
import Card from '../../components/card';
import TextInput from '../../components/form/textInput';
import SearchIcon from '../../assets/icons/searchIcon';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { ArrowLeft, XCircle } from 'react-feather';
import ItemTeacherView from '../../components/search/listItem/ItemTeacherView';
import { getAllUsers, get } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';

const SearchResult = () => {
  const location = useLocation();
  const searchVal = location.state?.searchVal || '';
  const navigate = useNavigate();
  const { token } = useAuth();
  const [value, setValue] = useState(searchVal);
  const [users, setUsers] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState(null);

  useEffect(() => {
    console.log('Token:', token);
    console.log('decoded token:', jwtDecode(token));

    const logId = jwtDecode(token).userId;
    get(`users/${logId}`).then((response) => {
      setCurrentUserRole(response.data.role);
    });
  }, [token]);

  // Search api from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers(value);
        setUsers(result);
      } catch (error) {
        console.error('Failed to fetch users: ' + error);
      }
    };

    fetchUsers();
  }, [value]);

  // Change function (onChange)
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="searchresult-container">
      <div className="top-level">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={40} />
        </button>
        <h2>Search Results</h2>
      </div>
      <div className="page-info">
        <Card>
          <form onSubmit={(e) => e.preventDefault()} className="search-form">
            <TextInput icon={<SearchIcon />} value={value} name="Search" onChange={onChange} />
            <button type="button" className="clear-btn" onClick={() => setValue('')}>
              <XCircle size={30} />
            </button>
          </form>
        </Card>
        <div className="search-results">
          <p className="people-text">People</p>
          <hr />
          {users.length > 0 ? (
            users.map((user) => {
              if (currentUserRole === 'STUDENT') {
                return <ItemStudentView key={user.id} user={user} />;
              } else {
                return <ItemTeacherView key={user.id} user={user} />;
              }
            })
          ) : (
            <h3>No results found</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
