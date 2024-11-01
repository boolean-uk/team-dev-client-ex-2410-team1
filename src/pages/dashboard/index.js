import { useEffect, useState } from 'react';
import SearchIcon from '../../assets/icons/searchIcon';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import TextInput from '../../components/form/textInput';
import Posts from '../../components/posts';
import useModal from '../../hooks/useModal';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { getPosts, post, getCohortsById } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
import Avatar from '../../components/avatar';

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { loggedInUser } = useAuth();
  const [initials, setInitials] = useState('');
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  useEffect(() => {
    getCohortsById(loggedInUser.cohort_id).then(setCohorts);
  }, [cohorts]);

  useEffect(() => {
    setInitials(loggedInUser.firstName.charAt(0) + loggedInUser.lastName.charAt(0));
  }, [loggedInUser]);

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
    setModal('Create a post', <CreatePostModal addPost={addNewPost} />); // CreatePostModal is just a standard React component, nothing special

    // Open the modal!
    openModal();
  };

  const addNewPost = async (text) => {
    await post('posts', { content: text });
    getPosts().then(setPosts);
  };

  const filteredCohorts = cohorts.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchVal.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon">
              {loggedInUser.imageUrl ? (
                <img src={loggedInUser.imageUrl} alt="Profile" />
              ) : (
                <p>{initials}</p>
              )}
            </div>
            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts posts={posts} />
      </main>

      <aside>
        <Card>
          <form onSubmit={handleSearchSubmit}>
            <TextInput icon={<SearchIcon />} value={searchVal} name="Search" onChange={onChange} />
          </form>
        </Card>

        <Card>
          <div className="cohort-container">
            <h4>My Cohort </h4>
            <p className="under-title">Software Development, Cohort {loggedInUser.cohort_id}</p>
            <hr className="line" />
            <div className="cohort-user-info">
              {filteredCohorts.map((user) => (
                <p key={user.id}>
                  <Avatar user={user} />
                </p>
              ))}
            </div>
          </div>
        </Card>
      </aside>
    </>
  );
};

export default Dashboard;
