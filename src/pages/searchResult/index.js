import { useLocation, useNavigate } from 'react-router-dom';
import ItemStudentView from '../../components/search/listItem/ItemStudentView';
import './style.css';
import Card from '../../components/card';
import TextInput from '../../components/form/textInput';
import SearchIcon from '../../assets/icons/searchIcon';
import { useEffect, useState } from 'react';
import { ArrowLeft, XCircle } from 'react-feather';
import ItemTeacherView from '../../components/search/listItem/ItemTeacherView';
import { getAllUsers } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';

const SearchResult = () => {
  const location = useLocation();
  const searchVal = location.state?.searchVal || '';
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();
  const [value, setValue] = useState(searchVal);

  const [users, setUsers] = useState([]);

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

  console.log(loggedInUser.role);

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
      <Card>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextInput
            icon={<SearchIcon />}
            value={value}
            name="Search"
            onChange={onChange}
            placeholder="Search"
          />
          <button type="button" onClick={() => setValue('')}>
            <XCircle size={30} />
          </button>
        </form>
      </Card>
      <div className="search-results">
        {users.map((user) => {
          if (loggedInUser.role === 'STUDENT') {
            console.log(loggedInUser.role);
            return <ItemStudentView key={user.id} user={user} />;
          } else {
            return <ItemTeacherView key={user.id} user={user} />;
          }
        })}
      </div>
    </div>
  );
};

export default SearchResult;
