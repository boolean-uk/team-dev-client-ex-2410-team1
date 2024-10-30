import { useState, useEffect } from 'react';
import SearchIcon from '../../assets/icons/searchIcon';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import TextInput from '../../components/form/textInput';
import Posts from '../../components/posts';
import useModal from '../../hooks/useModal';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../service/apiClient';

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  // Search api fra backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers(searchVal);
        setUsers(result);
      } catch (error) {
        console.error('Failed to fetch users: ' + error);
      }
    };

    fetchUsers();
  }, [searchVal]);

  // Create a function to render the users when input changes in real-time also!!
  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate('/searchresult', { state: { searchVal } });
    }
  };

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  // Create a function to run on user interaction
  const showModal = () => {
    // Use setModal to set the header of the modal and the component the modal should render
    setModal('Create a post', <CreatePostModal />); // CreatePostModal is just a standard React component, nothing special

    // Open the modal!
    openModal();
  };

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon">
              <p>AJ</p>
            </div>
            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts />
      </main>

      <aside>
        <Card>
          <form onSubmit={handleSearchSubmit}>
            <TextInput icon={<SearchIcon />} value={searchVal} name="Search" onChange={onChange} />
          </form>
        </Card>

        <Card>
          <h4>My Cohort</h4>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {/* Render the user component here, NEED ANOTHER COMPONENT */}
                <p>{user.firstName}</p>
              </li>
            ))}
          </ul>
        </Card>
      </aside>
    </>
  );
};

export default Dashboard;
