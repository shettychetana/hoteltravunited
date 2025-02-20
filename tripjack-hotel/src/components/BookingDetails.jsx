
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand'
import { 
  Container, 
  Card, 
  Button, 
  Divider, 
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
 
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
 import StarIcon from "@mui/icons-material/Star";
import RoomIcon from "@mui/icons-material/Room";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BedIcon from "@mui/icons-material/Bed";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HotelIcon from "@mui/icons-material/Hotel";
import { useNavigate } from "react-router-dom";
import WifiIcon from "@mui/icons-material/Wifi";
import DownloadIcon from "@mui/icons-material/Download";
import { Typography, Grid, Avatar, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
const bookingData = {
  customerName: 'Chetana Shetty',
  customerImage: 'https://via.placeholder.com/150',
  checkInDate: 'Thur, Dec 8',
  checkOutDate: 'Fri, Dec 9',
  nights: '1 Night',
  checkInTime: '12:00pm',
  checkOutTime: '11:30pm',
  roomType: 'Superior room - 1 double bed or 2 twin beds',
  roomNumber: 'On arrival',
  bookingId: 'TJS208001316188',
  hotelLogo: 'https://via.placeholder.com/100',
  hotelName: 'Lemon Tree Hotels'
};
const BookingDetails = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const location = useLocation();
  const { bookingId } = location.state || {};
  const [bookingData, setBookingData] = useState(null);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [roomInfo, setRoomInfo] = useState(null);
  const [queryInfo, setQueryInfo] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);
const [priceInfo, setPriceInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const checkinDate = new Date(queryInfo?.checkinDate);
const checkoutDate = new Date(queryInfo?.checkoutDate);

// Calculate difference in days
const dayDifference = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
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
        console.log("Booking Details:", data);
        setBookingData(data.order);
        setHotelInfo(data.itemInfos?.HOTEL?.hInfo);
        setRoomInfo(data.itemInfos?.HOTEL?.hInfo?.ops?.[0]?.ris?.[0]);
        setPriceInfo(data.itemInfos?.HOTEL?.hInfo?.ops?.[0]);
        setQueryInfo(data.itemInfos?.HOTEL?.query);
        setOrderInfo(data.order);
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
    <Container maxWidth="lg">
       
      {/* Hotel Information Section */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3 }}>
      <Card sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", borderRadius: 3, overflow: "hidden", maxWidth: 1200, width: "100%" }}>
        
        <Box sx={{ backgroundColor: "#E8F4FA", padding: 2, minWidth: isMobile ? "100%" : 150, textAlign: "center" }}>
          <Typography variant="h6" fontWeight="bold">
          {queryInfo?.checkinDate || "N/A"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
          Check-In
          </Typography>
          <Box
            sx={{ backgroundColor: "white", display: "inline-block", padding: "4px 12px", borderRadius: 2, mt: 1 }}
          >
            <Typography variant="body2" fontWeight="bold">  {dayDifference > 0 ? `${dayDifference} Nights` : "Invalid Dates"}
            </Typography>
          </Box>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
          {queryInfo?.checkoutDate || "N/A"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Check-Out 
          </Typography>
        </Box>

        {/* Middle Section */}
        <Box sx={{ flex: 1, p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#F56A57", color: "white", p: 1, borderRadius: 2 }}>
            <Avatar src="https://via.placeholder.com/40" sx={{ width: 40, height: 40, mr: 1 }} />
            <Typography fontWeight="bold">{roomInfo?.ti[0].fN} {roomInfo?.ti[0].lN}</Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 1, color: "#F56A57", fontWeight: "bold" }}>
            {roomInfo?.rc || "N/A"}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="body2">Check-in time <strong>12:00pm</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="body2">Check-out time <strong>11:30pm</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
              <MeetingRoomIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="body2">Room no. <strong>On arrival</strong></Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
          {priceInfo.sc} {priceInfo.tp}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary">
            {roomInfo.sc}{roomInfo.tp}
          </Typography> */}
        </Box>

        {/* Right Section */}
        <Box 
  sx={{ 
    display: "flex", 
    flexDirection: "column",
    alignItems: "center", 
    justifyContent: "center", 
    p: 2, 
    boxShadow: 3, 
    backgroundColor: "white", 
    borderRadius: 2 
  }}
>
  <Typography 
    variant="h4" 
    sx={{ 
      fontWeight: "bold", 
      color: "#6BA843", // Green color similar to the logo
      textTransform: "lowercase",
      fontFamily: "'Arial', sans-serif"
    }}
  >
    {hotelInfo.name} 
    {/* <span style={{ color: "#FDC82F" }}>tree</span> */}
  </Typography>
  <Typography 
    variant="subtitle2" 
    sx={{ 
      letterSpacing: 2, 
      color: "#FDC82F",
      fontWeight: "bold",
      fontSize: "12px"
    }}
  >
    HOTELS
  </Typography>
</Box>

      </Card>
    </Box>

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
      
      
      
      <Box 
      sx={{ 
       
        margin: "auto", 
        padding: "20px", 
        border: "1px solid #d1d1d1", 
        borderRadius: "8px",
        lineHeight: "1.6",
        marginTop: "20px",
      }}
    >
      {/* Terms and Conditions Title */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Terms and Conditions
      </Typography>

      {/* Payments Section */}
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Payments
      </Typography>
      <List sx={{ paddingLeft: "16px" }}>
        <ListItem sx={{ display: "list-item" }}>
          If you are purchasing your ticket using a debit or credit card via the Website, we will process these payments via the automated secure common payment gateway which will be subject to fraud screening purposes.
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          If you do not supply the correct card billing address and/or cardholder information, your booking will not be confirmed and the overall cost may increase. We reserve the right to cancel your booking if payment is declined for any reason or if you have supplied incorrect card information.
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          Golobe may require the cardholder to provide additional payment verification upon request by either submitting an online form or visiting the nearest Golobe office at the time of check-in.
        </ListItem>
      </List>

      {/* Contact Us Section */}
      <Typography variant="h6" fontWeight="bold" mt={3}>
        Contact Us
      </Typography>
      <Typography variant="body1">
        If you have any questions about our Website or our Terms of Use, please contact:
      </Typography>
      <Typography variant="body1" mt={1}>
        <strong>Travunited Group Q.C.S.C</strong> <br />
        Travunited Tower <br />
        P.O. Box: 576102 <br />
        Udupi, Karnataka <br />
        Further contact details can be found at Travunited.com
      </Typography>
    </Box>
    </Container>
  );
    
};

export default BookingDetails;
