import { useLocation } from 'react-router-dom';
import ItemStudentView from '../../components/search/listItem/ItemStudentView';

const SearchResult = () => {
  const location = useLocation();
  const searchVal = location.state?.searchVal || '';

  return (
    <div>
      <h2>Search Results for: {searchVal}</h2>
      <ItemStudentView />
      {/* Render your search results here */}
    </div>
  );
};

export default SearchResult;
