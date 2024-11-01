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
import { getPosts, post } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { loggedInUser } = useAuth();
  const [initials, setInitials] = useState('');

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

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
          <h4>My Cohort</h4>
        </Card>
      </aside>
    </>
  );
};

export default Dashboard;
