


// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/ResultsPage.css';
// import { Grid, Paper, Typography, Button } from '@mui/material';

// const ResultsPage = () => {
//   const location = useLocation();
//   const { hotelData, message } = location.state || {};

//   // Extract the array of hotels from the nested structure
//   const hotels = hotelData?.searchResult?.his || [];

//   return (
//     <div className="results-page" style={{maxWidth: '1200px', margin: '0 auto', padding: '16px'}}>
//       <Grid container spacing={2}>
//         {/* Sidebar */}
//         <Grid item xs={12} sm={4} md={3}>
//           <Paper elevation={3} className="sidebar">
//             <Typography variant="h6" gutterBottom>
//               Sort By
//             </Typography>
//             <ul>
//               <li>Rating</li>
//               <li>Preferred</li>
//               <li>Price</li>
//             </ul>
//           </Paper>
//         </Grid>

//         {/* Hotel Results */}
//         <Grid item xs={12} sm={8} md={9}>
//           <Paper elevation={3} className="hotel-container">
//             {hotels.length > 0 ? (
//               <div>
//                 {hotels.map((hotel, index) => (
//                   <Paper key={index} className="hotel-card" elevation={1}>
//                     <Grid container spacing={2} alignItems="center">
//                       {/* Hotel Image */}
//                       <Grid item xs={3}>
//                         <img
//                           src={hotel.img[0]?.url || 'placeholder.jpg'}
//                           alt={hotel.name}
//                           className="hotel-image"
//                           style={{ width: '100%',height: '100%', borderRadius: '8px' }}
//                         />
//                       </Grid>

//                       {/* Hotel Details */}
//                       <Grid item xs={6}>
//                      <Typography variant="h6" gutterBottom style={{textAlign: 'left'}}>
//   {hotel.name}
// </Typography>
//                         <Typography variant="body2" color="textSecondary"  style={{textAlign: 'left'}}>
//                           {hotel.ad.adr}, {hotel.ad.city.name}, {hotel.ad.state.name}
//                         </Typography>
                        
                        
//                         <Typography variant="body2" className="rating" style={{ color: 'orange',textAlign: 'left' }}>
//                           {'★'.repeat(hotel.rt)}{'☆'.repeat(5 - hotel.rt)}
//                         </Typography>
//                         {hotel.ifca && (
//                           <Typography
//                             variant="body2"
//                             style={{ color: 'green', marginTop: '8px',textAlign: 'left' }}
//                           >
//                             Free Cancellation Available
//                           </Typography>
//                         )}
//                       </Grid>

//                       {/* Price and Action */}
//                       <Grid item xs={3} style={{ textAlign: 'right' }}>
//                         <Typography variant="h6" color="black" style={{fontWeight: 'bold'}}>
//                           ₹{hotel.pops[0]?.tpc.toFixed(0)}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           {hotel.pops[0]?.fc[0]} <br />  Night(s)
//                         </Typography>
//                         <Button
//                           variant="contained"
//                           color="warning"
//                           style={{
//                             marginTop: '16px',
//                             backgroundColor: '#ff6600',
//                             color: 'white',
//                           }}
//                         >
//                           Select Room
//                         </Button>
//                       </Grid>
//                     </Grid>
//                   </Paper>
//                 ))}
//               </div>
//             ) : (
//               <Typography variant="h5" align="center" color="textSecondary">
//                 {message || 'No results found'}
//               </Typography>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default ResultsPage;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ResultsPage.css';
import { Grid, Paper, Typography, Button } from '@mui/material';
import axios from 'axios';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotelData, message } = location.state || {};

  // Extract the array of hotels from the nested structure
  const hotels = hotelData?.searchResult?.his || [];

  // Handle Select Room Click
  const handleSelectRoom = async (hotelId) => {
    try {
      const apiUrl = 'https://tripjack.com/hms/v1/hotelDetail-search';
      const apiKey = '610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172';
      const requestBody = { id: hotelId };

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
        },
      });

      // Navigate to HotelDetail page with fetched data
      navigate('/hotelDetail', { state: { hotelDetail: response.data } });
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      alert('Failed to fetch hotel details. Please try again.');
    }
  };

  return (
    <div className="results-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper elevation={3} className="sidebar">
            <Typography variant="h6" gutterBottom>
              Sort By
            </Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', cursor: 'pointer' }}>Rating</li>
              <li style={{ padding: '8px 0', cursor: 'pointer' }}>Preferred</li>
              <li style={{ padding: '8px 0', cursor: 'pointer' }}>Price</li>
            </ul>
          </Paper>
        </Grid>

        {/* Hotel Results */}
        <Grid item xs={12} sm={8} md={9}>
          <Paper elevation={3} className="hotel-container">
            {hotels.length > 0 ? (
              <div>
                {hotels.map((hotel, index) => (
                  <Paper key={index} className="hotel-card" elevation={1} style={{ marginBottom: '16px' }}>
                    <Grid container spacing={2} alignItems="center">
                      {/* Hotel Image */}
                      <Grid item xs={12} sm={3}>
                        <img
                          src={hotel.img[0]?.url || 'placeholder.jpg'}
                          alt={hotel.name}
                          className="hotel-image"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            maxHeight: '150px',
                          }}
                        />
                      </Grid>

                      {/* Hotel Details */}
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom style={{ textAlign: 'left' }}>
                          {hotel.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" style={{ textAlign: 'left' }}>
                          {hotel.ad.adr}, {hotel.ad.city.name}, {hotel.ad.state.name}
                        </Typography>
                        <Typography variant="body2" style={{ color: 'orange', textAlign: 'left' }}>
                          {'★'.repeat(hotel.rt)}{'☆'.repeat(5 - hotel.rt)}
                        </Typography>
                        {hotel.ifca && (
                          <Typography
                            variant="body2"
                            style={{ color: 'green', marginTop: '8px', textAlign: 'left' }}
                          >
                            Free Cancellation Available
                          </Typography>
                        )}
                      </Grid>

                      {/* Price and Action */}
                      <Grid item xs={12} sm={3} style={{ textAlign: 'right' }}>
                        <Typography variant="h6" color="black" style={{ fontWeight: 'bold' }}>
                          ₹{hotel.pops[0]?.tpc.toFixed(0)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {hotel.pops[0]?.fc[0]} <br /> Night(s)
                        </Typography>
                        <Button
                          variant="contained"
                          color="warning"
                          style={{
                            marginTop: '16px',
                            backgroundColor: '#ff6600',
                            color: 'white',
                          }}
                          onClick={() => handleSelectRoom(hotel.id)} // Pass the hotel ID
                        >
                          Select Room
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </div>
            ) : (
              <Typography variant="h5" align="center" color="textSecondary">
                {message || 'No results found'}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResultsPage;
