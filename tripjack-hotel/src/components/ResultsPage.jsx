


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

// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../styles/ResultsPage.css';
// import { Grid, Paper, Typography, Button } from '@mui/material';
// import axios from 'axios';

// const ResultsPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { hotelData, message } = location.state || {};

//   // Extract the array of hotels from the nested structure
//   const hotels = hotelData?.searchResult?.his || [];

//   // Handle Select Room Click
//   const handleSelectRoom = async (hotelId) => {
//     try {
//       const apiUrl = 'https://tripjack.com/hms/v1/hotelDetail-search';
//       const apiKey = '610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172';
//       const requestBody = { id: hotelId };

//       const response = await axios.post(apiUrl, requestBody, {
//         headers: {
//           'Content-Type': 'application/json',
//           'apikey': apiKey,
//         },
//       });

//       // Navigate to HotelDetail page with fetched data
//       navigate('/hotelDetail', { state: { hotelDetail: response.data } });
//     } catch (error) {
//       console.error('Error fetching hotel details:', error);
//       alert('Failed to fetch hotel details. Please try again.');
//     }
//   };

//   return (
//     <div className="results-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
//       <Grid container spacing={2}>
//         {/* Sidebar */}
//         <Grid item xs={12} sm={4} md={3}>
//           <Paper elevation={3} className="sidebar">
//             <Typography variant="h6" gutterBottom>
//               Sort By
//             </Typography>
//             <ul style={{ listStyleType: 'none', padding: 0 }}>
//               <li style={{ padding: '8px 0', cursor: 'pointer' }}>Rating</li>
//               <li style={{ padding: '8px 0', cursor: 'pointer' }}>Preferred</li>
//               <li style={{ padding: '8px 0', cursor: 'pointer' }}>Price</li>
//             </ul>
//           </Paper>
//         </Grid>

//         {/* Hotel Results */}
//         <Grid item xs={12} sm={8} md={9}>
//           <Paper elevation={3} className="hotel-container">
//             {hotels.length > 0 ? (
//               <div>
//                 {hotels.map((hotel, index) => (
//                   <Paper key={index} className="hotel-card" elevation={1} style={{ marginBottom: '16px' }}>
//                     <Grid container spacing={2} alignItems="center">
//                       {/* Hotel Image */}
//                       <Grid item xs={12} sm={3}>
//                         <img
//                           src={hotel.img[0]?.url || 'placeholder.jpg'}
//                           alt={hotel.name}
//                           className="hotel-image"
//                           style={{
//                             width: '100%',
//                             height: '100%',
//                             borderRadius: '8px',
//                             objectFit: 'cover',
//                             maxHeight: '150px',
//                           }}
//                         />
//                       </Grid>

//                       {/* Hotel Details */}
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="h6" gutterBottom style={{ textAlign: 'left' }}>
//                           {hotel.name}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary" style={{ textAlign: 'left' }}>
//                           {hotel.ad.adr}, {hotel.ad.city.name}, {hotel.ad.state.name}
//                         </Typography>
//                         <Typography variant="body2" style={{ color: 'orange', textAlign: 'left' }}>
//                           {'★'.repeat(hotel.rt)}{'☆'.repeat(5 - hotel.rt)}
//                         </Typography>
//                         {hotel.ifca && (
//                           <Typography
//                             variant="body2"
//                             style={{ color: 'green', marginTop: '8px', textAlign: 'left' }}
//                           >
//                             Free Cancellation Available
//                           </Typography>
//                         )}
//                       </Grid>

//                       {/* Price and Action */}
//                       <Grid item xs={12} sm={3} style={{ textAlign: 'right' }}>
//                         <Typography variant="h6" color="black" style={{ fontWeight: 'bold' }}>
//                           ₹{hotel.pops[0]?.tpc.toFixed(0)}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           {hotel.pops[0]?.fc[0]} <br /> Night(s)
//                         </Typography>
//                         <Button
//                           variant="contained"
//                           color="warning"
//                           style={{
//                             marginTop: '16px',
//                             backgroundColor: '#ff6600',
//                             color: 'white',
//                           }}
//                           onClick={() => handleSelectRoom(hotel.id)} // Pass the hotel ID
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
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, Button, Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotelData, message } = location.state || {};
  const hotels = hotelData?.searchResult?.his || [];
console.log("2ndpage",hotels);
  const [minPrice, setMinPrice] = useState(3867);
  const [maxPrice, setMaxPrice] = useState(3868);
  const [selectedRating, setSelectedRating] = useState(null);
  const [freeCancellation, setFreeCancellation] = useState(false);

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    if (e.target.name === "minPrice") setMinPrice(value);
    if (e.target.name === "maxPrice") setMaxPrice(value);
  };

  const handleSelectRoom = async (hotelId) => {
    try {
      const apiUrl = "https://tripjack.com/hms/v1/hotelDetail-search";
      const apiKey = "610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172";
      const requestBody = { id: hotelId };

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
        },
      });

      navigate("/hotelDetail", { state: { hotelDetail: response.data } });
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      alert("Failed to fetch hotel details. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>

            {/* Search by Name */}
            <TextField
              fullWidth
              label="Search by Hotel Name"
              variant="outlined"
              size="small"
              margin="normal"
            />

            {/* Favorites */}
            <Button fullWidth variant="outlined" color="secondary" style={{ marginBottom: "16px" }}>
              View My Favourites ❤️
            </Button>

            {/* Free Cancellation */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={freeCancellation}
                  onChange={(e) => setFreeCancellation(e.target.checked)}
                />
              }
              label="Free Cancellation Available"
            />

            {/* Price Filter */}
            <Typography variant="subtitle1" gutterBottom>
              Price Range
            </Typography>
            <Box display="flex" gap={1} alignItems="center" marginBottom="16px">
              <TextField
                type="number"
                name="minPrice"
                value={minPrice}
                onChange={handlePriceChange}
                label="Min Price"
                variant="outlined"
                size="small"
              />
              <Typography variant="body1">to</Typography>
              <TextField
                type="number"
                name="maxPrice"
                value={maxPrice}
                onChange={handlePriceChange}
                label="Max Price"
                variant="outlined"
                size="small"
              />
            </Box>

            {/* Star Rating Filter */}
            <Typography variant="subtitle1" gutterBottom>
              Star Rating
            </Typography>
            {[5, 4, 3, 2, 1, 0].map((rating) => (
              <FormControlLabel
                key={rating}
                control={
                  <Checkbox
                    checked={selectedRating === rating}
                    onChange={() => setSelectedRating(rating)}
                  />
                }
                label={`${rating} Star${rating !== 1 ? "s" : ""}`}
              />
            ))}
          </Paper>
        </Grid>

        {/* Hotel Results */}
        <Grid item xs={12} sm={8} md={9}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            {hotels.length > 0 ? (
              hotels.map((hotel, index) => (
                <Paper key={index} style={{ marginBottom: "16px", padding: "16px" }} elevation={1}>
                  <Grid container spacing={2} alignItems="center">
                    {/* Hotel Image */}
                    <Grid item xs={12} sm={3}>
                      <img
                        src={hotel.img[0]?.url || "placeholder.jpg"}
                        alt={hotel.name}
                        style={{
                          width: "100%",
                          height: "150px",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>

                    {/* Hotel Details */}
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" style={{ fontWeight: "bold" ,textAlign:"left"}}>{hotel.name}</Typography>
                      <Typography variant="body2" color="textSecondary" style={{ textAlign: "left" }}>
                        {hotel.ad.adr} {hotel.ad.city.name}, {hotel.ad.state.name}
                      </Typography>
                      <Typography variant="body2" style={{ color: "orange" , textAlign: "left" }}>
                        {"★".repeat(hotel.rt)}{" "}
                        {"☆".repeat(5 - hotel.rt)}
                      </Typography>
                      {hotel.ifca && (
                        <Typography variant="body2" style={{ color: "green", marginTop: "8px" }}>
                          Free Cancellation Available
                        </Typography>
                      )}
                    </Grid>

                    {/* Price and Action */}
                    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
                      <Typography variant="h6" color="black" style={{ fontWeight: "bold" }}>
                        ₹{hotel.pops[0]?.tpc.toFixed(0)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {hotel.pops[0]?.fc[0]} Night(s)
                      </Typography>
                      <Button
                        variant="contained"
                        color="warning"
                        style={{ marginTop: "16px" }}
                        onClick={() => handleSelectRoom(hotel.id)}
                      >
                        Select Room
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))
            ) : (
              <Typography variant="h5" align="center" color="textSecondary">
                {message || "No results found"}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResultsPage;
