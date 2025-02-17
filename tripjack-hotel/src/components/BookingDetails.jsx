// import { useLocation } from "react-router-dom";
// import React from "react";

// const BookingDetails = () => {
//   const location = useLocation();
//   const { bookingId, amount, checkincheckout, ops } = location.state || {};

//   return (
//     <div>
//       <h2>Booking Details</h2>
//       <p>Booking ID: {bookingId}</p>
//       <p>Amount Paid: ₹{amount}</p>
//       <p>Check-in: {checkincheckout?.checkinDate}</p>
//       <p>Check-out: {checkincheckout?.checkoutDate}</p>
//     </div>
//   );
// };

// export default BookingDetails;
// import { useLocation } from "react-router-dom";
// import React, { useEffect, useState } from "react";

// const BookingDetails = () => {
//   const location = useLocation();
//   const { bookingId } = location.state || {}; // Get bookingId from state
//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!bookingId) {
//       setError("No Booking ID provided.");
//       setLoading(false);
//       return;
//     }

//     const fetchBookingDetails = async () => {
//       try {
//         const response = await fetch("https://apitest.tripjack.com/oms/v1/hotel/booking-details", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "apikey":"81210652be6625-ffb6-4457-8d7b-3b87bfa351c3",
//           },
//           body: JSON.stringify({ bookingId }),
//         });

//         if (!response.ok) {
//           throw new Error(`API Error: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Booking Details:", data);
//         setBookingData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingDetails();
//   }, [bookingId]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!bookingData?.order) return <p>No booking details found.</p>;

//   const { order, itemInfos } = bookingData;
//   const hotelInfo = itemInfos?.HOTEL?.hInfo;
//   const roomInfo = hotelInfo?.ops?.[0]?.ris?.[0];

//   return (
//     <div className="booking-details-container" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ color: "#FF6748" }}>Booking Details</h2>
//       <div className="booking-info" style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
//         <p><strong>Booking ID:</strong> {order.bookingId}</p>
//         <p><strong>Amount Paid:</strong> ₹{order.amount}</p>
//         <p><strong>Status:</strong> {order.status}</p>
//         <p><strong>Created On:</strong> {new Date(order.createdOn).toLocaleString()}</p>
//         <p><strong>Contact Email:</strong> {order.deliveryInfo.emails?.[0]}</p>
//         <p><strong>Contact Number:</strong> {order.deliveryInfo.contacts?.[0]}</p>
//       </div>

//       {hotelInfo && (
//         <div className="hotel-info" style={{ marginTop: "20px" }}>
//           <h3 style={{ color: "#FF6748" }}>Hotel Information</h3>
//           <p><strong>Hotel Name:</strong> {hotelInfo.name}</p>
//           <p><strong>Rating:</strong> {hotelInfo.rt} ⭐</p>
//           <p><strong>Address:</strong> {hotelInfo.ad.adr}, {hotelInfo.ad.ctn}, {hotelInfo.ad.sn}, {hotelInfo.ad.cn}</p>
//         </div>
//       )}

//       {roomInfo && (
//         <div className="room-info" style={{ marginTop: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
//           <h3 style={{ color: "#FF6748" }}>Room Details</h3>
//           <p><strong>Room Type:</strong> {roomInfo.rt}</p>
//           <p><strong>Meal Basis:</strong> {roomInfo.mb}</p>
//           <p><strong>Total Price:</strong> ₹{roomInfo.tp}</p>
//           <p><strong>Bed Type:</strong> {roomInfo.radi.bds?.[0]?.bt}</p>
//           <p><strong>Room Size:</strong> {roomInfo.radi.ar.asm} sqm ({roomInfo.radi.ar.asf} sqft)</p>
//           <h4 style={{ color: "#FF6748" }}>Amenities</h4>
//           <ul>
//             {roomInfo.rexb?.BENEFIT?.[0]?.values.map((benefit, index) => (
//               <li key={index}>{benefit}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingDetails;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Divider, 
  Box, 
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {
  CalendarToday as CalendarTodayIcon,
  AccessTime as AccessTimeIcon,
  Room as RoomIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  Hotel as HotelIcon,
  Bed as BedIcon,
  Restaurant as RestaurantIcon,
  Wifi as WifiIcon,
  LocalParking as ParkingIcon
} from "@mui/icons-material";


const BookingDetails = () => {
  const location = useLocation();
  const { bookingId } = location.state || {};
  const [bookingData, setBookingData] = useState(null);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [roomInfo, setRoomInfo] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookingId) {
      setError("No Booking ID provided.");
      setLoading(false);
      return;
    }

    const fetchBookingDetails = async () => {
      try {
        const response = await fetch("https://apitest.tripjack.com/oms/v1/hotel/booking-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": "81210652be6625-ffb6-4457-8d7b-3b87bfa351c3",
          },
          body: JSON.stringify({ bookingId }),
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        setBookingData(data.order);
        setHotelInfo(data.itemInfos?.HOTEL?.hInfo);
        setRoomInfo(data.itemInfos?.HOTEL?.hInfo?.ops?.[0]?.ris?.[0]);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Box textAlign="center" mt={4}>
      <Typography color="error" variant="h6">
        {error}
      </Typography>
    </Box>
  );
  
  if (!bookingData) return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h6">
        No booking details found.
      </Typography>
    </Box>
  );


  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Hotel Information Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" sx={{ color: '#1976d2' }} fontWeight="bold">

              {hotelInfo?.name}
              <Box component="span" sx={{ ml: 1 }}>
                {Array.from({ length: hotelInfo?.rt || 0 }).map((_, i) => (
                  <StarIcon key={i} fontSize="small" color="secondary" />
                ))}
              </Box>
            </Typography>
            <Typography variant="h5" color="secondary">
              ₹ {bookingData.amount}
            </Typography>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            <RoomIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            {hotelInfo?.ad?.adr}, {hotelInfo?.ad?.ctn}, {hotelInfo?.ad?.sn}, {hotelInfo?.ad?.cn}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Check-In/Check-Out Section */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: '#FF6748', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Check-In
                  </Typography>
                  <Typography>
                    <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {roomInfo?.checkInDate}
                  </Typography>
                  <Typography>
                    <AccessTimeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {roomInfo?.checkInTime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Check-Out
                  </Typography>
                  <Typography>
                    <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {roomInfo?.checkOutDate}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Booking ID: {bookingData.bookingId}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Room Details Section */}
      {roomInfo && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Room Details
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <BedIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Room Type" 
                      secondary={roomInfo.rt} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <RestaurantIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Meal Plan" 
                      secondary={roomInfo.mb} 
                    />
                  </ListItem>
                </List>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <HotelIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Bed Type" 
                      secondary={roomInfo.radi?.bds?.[0]?.bt} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <WifiIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Amenities" 
                      secondary={
                        roomInfo.rexb?.BENEFIT?.[0]?.values?.join(', ') || 'N/A'
                      } 
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Terms and Conditions Section */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Terms & Conditions
          </Typography>
          
          <List dense>
            <ListItem>
              <ListItemText
                primary="Cancellation Policy"
                secondary="Free cancellation until 24 hours before check-in"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Payment"
                secondary="Full payment required at time of booking"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Download Button */}
      <Box textAlign="center" mt={3}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<DownloadIcon />}
        >
          Download Booking Details
        </Button>
      </Box>
    </Container>

  );
};

export default BookingDetails;
