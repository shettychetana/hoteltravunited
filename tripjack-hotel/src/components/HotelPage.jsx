import { useLocation } from 'react-router-dom';

const HotelPage = () => {
  const location = useLocation();
  const { searchIds } = location.state || {}; // Get searchIds from the passed state

  console.log("Search IDs on Next Page:", searchIds);

  return (
    <div>
      {/* Use searchIds here */}
    </div>
  );
};
 export default HotelPage;