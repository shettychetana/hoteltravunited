import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, CardContent, Typography, Button, Box, TextField, MenuItem } from "@mui/material";
import axios from "axios"
const primaryColor = "#FF6748";

const BookingPage = () => {
  const location = useLocation();
  const { bookingId, amount, checkincheckout } = location.state || {};

  // Extract room information
  const roomInfo = checkincheckout?.roomInfo?.[0] || {};
  const defaultAdults = roomInfo.numberOfAdults || 1;
  const defaultChildren = roomInfo.numberOfChild || 0;
  const childAges = roomInfo.childAge || [];

  // State to track dynamic guests and contact details
  const [adults, setAdults] = useState(defaultAdults);
  const [children, setChildren] = useState(defaultChildren);
  const [guestData, setGuestData] = useState([]);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState(checkincheckout.deliveryInfo?.contacts[0] || "");
  const [email, setEmail] = useState(checkincheckout.deliveryInfo?.emails[0] || "");

  // Handle guest data changes
  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...guestData];
    updatedGuests[index] = { ...updatedGuests[index], [field]: value };
    setGuestData(updatedGuests);
  };

  // Handle form submission (Send Data to API)
  ;

  const handleSubmit = async () => {
    const requestBody = {
      bookingId,
      roomTravellerInfo: [
        {
          travellerInfo: guestData.map((guest, index) => ({
            fN: guest.firstName || "",
            lN: guest.lastName || "",
            ti: guest.title || "Mr",
            pt: index < adults ? "ADULT" : "CHILD",
            pan: index < adults ? guest.pan || "" : undefined,
          })),
        },
      ],
      deliveryInfo: {
        emails: [email],
        contacts: [phoneNumber],
        code: [countryCode],
      },
      type: "HOTEL",
      paymentInfos: [
        {
          amount,
        },
      ],
    };
  
    console.log("API Request Body:", JSON.stringify(requestBody, null, 2));
  
    try {
      const response = await axios.post(
        "https://apitest.tripjack.com/oms/v1/hotel/book",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "apikey": "812106087da1ea-c4d9-4f3b-86a4-6d044a812964",
          },
        }
      );
  
      console.log("Booking Successful:", response.data);
      alert("Booking Confirmed!");
    } catch (error) {
      console.error("Booking Failed:", error.response?.data || error.message);
      alert("Booking Failed! Check console for details.");
    }
  };
  

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" sx={{ color: primaryColor, fontWeight: "bold" }} gutterBottom>
            Booking Confirmation
          </Typography>
          <Typography variant="h6" color="textSecondary">Booking ID: {bookingId}</Typography>
          <Typography variant="h6">Check-in: {checkincheckout.checkinDate}</Typography>
          <Typography variant="h6">Check-out: {checkincheckout.checkoutDate}</Typography>

          {/* Guest Details Section */}
          <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>Guest Details</Typography>
          
          {Array.from({ length: adults }).map((_, index) => (
            <Box key={index} sx={{ display: "flex", gap: 2, my: 2 }}>
              <TextField select label="Title" defaultValue="Mr" onChange={(e) => handleGuestChange(index, "title", e.target.value)} sx={{ width: 100 }}>
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Ms">Ms</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
                <MenuItem value="Dr">Dr</MenuItem>
              </TextField>
              <TextField label={`First Name (Adult ${index + 1})`} fullWidth onChange={(e) => handleGuestChange(index, "firstName", e.target.value)} />
              <TextField label="Last Name" fullWidth onChange={(e) => handleGuestChange(index, "lastName", e.target.value)} />
             
            </Box>
          ))}

          {/* Add/Remove Adult Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Button variant="contained" onClick={() => setAdults(adults + 1)}>Add Guest</Button>
            {adults > 1 && (
              <Button variant="outlined" onClick={() => setAdults(adults - 1)}>Remove Guest</Button>
            )}
          </Box>

          {/* Children Details */}
          {children > 0 && (
            <>
              <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>Children Details</Typography>
              {Array.from({ length: children }).map((_, index) => (
                <Box key={index} sx={{ display: "flex", gap: 2, my: 2 }}>
                  <TextField select label="Title" defaultValue="Master" onChange={(e) => handleGuestChange(adults + index, "title", e.target.value)} sx={{ width: 100 }}>
                    <MenuItem value="Master">Master</MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                  </TextField>
                  <TextField label={`First Name (Child ${index + 1})`} fullWidth onChange={(e) => handleGuestChange(adults + index, "firstName", e.target.value)} />
                  <TextField label="Last Name" fullWidth onChange={(e) => handleGuestChange(adults + index, "lastName", e.target.value)} />
                  <TextField label="Age" fullWidth value={childAges[index] || ""} />
                </Box>
              ))}
            </>
          )}

          {/* Add/Remove Child Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Button variant="contained" onClick={() => setChildren(children + 1)}>Add Child</Button>
            {children > 0 && (
              <Button variant="outlined" onClick={() => setChildren(children - 1)}>Remove Child</Button>
            )}
          </Box>

          {/* Contact Details */}
          <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>Contact Details</Typography>
          <Box sx={{ display: "flex", gap: 2, my: 2 }}>
            <TextField select label="Country Code" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} sx={{ width: 120 }}>
              <MenuItem value="+91">India (+91)</MenuItem>
              <MenuItem value="+1">USA (+1)</MenuItem>
              <MenuItem value="+44">UK (+44)</MenuItem>
              <MenuItem value="+61">Australia (+61)</MenuItem>
            </TextField>
            <TextField label="Phone Number" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <TextField label="Email ID" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          </Box>

          {/* Payment Info */}
          
          <TextField label="PAN Number" fullWidth onChange={(e) => handleGuestChange( "pan", e.target.value)} />
          <Typography variant="h5" sx={{ my: 2, fontWeight: "bold" }}>Total Amount: ₹{amount?.toLocaleString()}</Typography>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" sx={{ backgroundColor: primaryColor, color: "#fff" }} onClick={handleSubmit}>
              Proceed to Payment
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookingPage;
