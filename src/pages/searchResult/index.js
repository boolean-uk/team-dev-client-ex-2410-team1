import { useLocation } from 'react-router-dom';
import ItemStudentView from '../../components/search/listItem/ItemStudentView';
import './style.css';
import Card from '../../components/card';
import TextInput from '../../components/form/textInput';
import SearchIcon from '../../assets/icons/searchIcon';
import { useState } from 'react';
import { ArrowLeft } from 'react-feather';

const SearchResult = () => {
  const location = useLocation();
  const searchVal = location.state?.searchVal || '';

  const [value, setValue] = useState(searchVal);

  // Search api fra backend

  // Change function (onChange)
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="searchresult-container">
      <div className="top-level">
        <button className="back-btn" onClick={() => console.log('Hello')}>
          <ArrowLeft size={40} />
        </button>
        <h2>Search Results</h2>
      </div>
      <Card>
        <form onSubmit={() => console.log('Hello')}>
          <TextInput icon={<SearchIcon />} value={value} name="Search" onChange={onChange} />
        </form>
      </Card>
      <ItemStudentView />
      <ItemStudentView />
      <ItemStudentView />
      <ItemStudentView />
      <ItemStudentView />
      {/* Render your search results here */}
    </div>
  );
};

export default SearchResult;
