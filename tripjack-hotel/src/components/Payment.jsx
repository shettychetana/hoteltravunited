
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import React, { useEffect } from "react";
// import { Card, CardContent, Typography, Button, Divider, Box } from "@mui/material";
// import { LocationOn, CalendarToday, Person, CreditCard } from "@mui/icons-material";

// const Payment = () => {
//   const location = useLocation(); 
//   const { hotelPayment, bookingId, amount, checkincheckout ,ops} = location.state || {};
//   console.log("Hotel Payment:", hotelPayment);
//   console.log("Booking ID:", bookingId);
//   console.log("Amount:", amount);
//   console.log("Checkincheckout:", checkincheckout);
//   console.log(" payment ops",ops);
//   // Extract values from location.state
//   //const { bookingId, amount, checkincheckout } = location.state || {}; 
//   const { checkinDate, checkoutDate, searchCriteria, searchPreferences, roomInfo } = checkincheckout || {};
//   const { cityName, countryName } = searchCriteria || {};
//   const { currency } = searchPreferences || {};
//   const { numberOfAdults, numberOfChild } = roomInfo?.[0] || {};
//   console.log("Booking ID:", bookingId);
//   console.log("Amount:", amount);
//   console.log("Check-in & Check-out:", checkincheckout);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const handlePayment = async () => {
//     // Make sure that amount is provided and is valid
//     if (!amount || amount <= 0) {
//       alert("Invalid payment amount. Please check your booking details.");
//       return;
//     }

//     try {
//       const { data } = await axios.post("http://localhost:5000/create-order", {
//         amount: 1, // Convert amount to paisa for Razorpay
//         bookingId: bookingId,
//       });

//       const options = {
//         key: "rzp_live_COgMwy0zi5Mx1j", // Razorpay live key
//         amount: data.amount, // This will be in paisa
//         currency: "INR",
//         order_id: data.id,
//         name: "Travunited",
//         description: `Booking ID: ${bookingId}`,
//         image: "https://your-logo-url.com/logo.png",
//         handler: function (response) {
//           alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}\nAmount Paid: ₹${amount}`);
//         },
//         prefill: {
//           name: "Customer Name",
//           email: "customer@example.com",
//           contact: "9876543210",
//         },
//         theme: { color: "#FF6748" },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert("Payment failed. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Pay with Razorpay</h2>
//       {amount && amount > 0 ? (
//         <div>
//           <p>Booking ID: {bookingId}</p>
       
         
          
//           <Card sx={{ maxWidth: 450, mx: "auto", p: 3, boxShadow: 3 }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Confirm Your Booking
//       </Typography>

//       <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         {/* Location & Dates */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <LocationOn color="primary" />
//           <Typography variant="body1" fontWeight="medium">
//             {cityName}, {countryName}
//           </Typography>
//         </Box>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <CalendarToday color="primary" />
//           <Typography variant="body1">
//             {checkinDate} - {checkoutDate}
//           </Typography>
//         </Box>

//         {/* Guest Details */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Person color="primary" />
//           <Typography variant="body1">
//             {numberOfAdults} Adults, {numberOfChild} Children
//           </Typography>
//         </Box>

//         {/* Divider */}
//         <Divider sx={{ my: 2 }} />

//         {/* Payment Info */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <CreditCard color="primary" />
//           <Typography variant="body1" fontWeight="bold">
//             Total: {currency} {amount}
//           </Typography>
//         </Box>

//         {/* Payment Button */}
//         <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handlePayment}>
        
//           Proceed to Payment
//         </Button>
//       </CardContent>
//     </Card>
//         </div>
//       ) : (
//         <p style={{ color: "red" }}>Invalid amount. Please check your booking.</p>
//       )}
//     </div>
//   );
// };

// export default Payment;
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Card, CardContent, Typography, Button, Divider, Box } from "@mui/material";
import { LocationOn, CalendarToday, Person, CreditCard } from "@mui/icons-material";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigation
  const { hotelPayment, bookingId, amount, checkincheckout, ops } = location.state || {};
  const { checkinDate, checkoutDate, searchCriteria, searchPreferences, roomInfo } = checkincheckout || {};
  const { cityName, countryName } = searchCriteria || {};
  const { currency } = searchPreferences || {};
  const { numberOfAdults, numberOfChild } = roomInfo?.[0] || {};

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      alert("Invalid payment amount. Please check your booking details.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/create-order", {
        amount: 1, // Convert amount to paisa for Razorpay
        bookingId: bookingId,
      });

      const options = {
        key: "rzp_live_COgMwy0zi5Mx1j", // Razorpay live key
        //key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
        amount: data.amount, // This will be in paisa
        currency: "INR",
        order_id: data.id,
        name: "Travunited",
        description: `Booking ID: ${bookingId}`,
        image: "https://your-logo-url.com/logo.png",
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}\nAmount Paid: ₹${amount}`);

          // Navigate to Booking Details page after payment success
          navigate("/booking-details", { state: { bookingId, amount, checkincheckout, ops } });
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9876543210",
        },
        theme: { color: "#FF6748" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Pay with Razorpay</h2>
      {amount && amount > 0 ? (
        <div>
          <p>Booking ID: {bookingId}</p>

          <Card sx={{ maxWidth: 450, mx: "auto", p: 3, boxShadow: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Confirm Your Booking
            </Typography>

            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Location & Dates */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn color="primary" />
                <Typography variant="body1" fontWeight="medium">
                  {cityName}, {countryName}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarToday color="primary" />
                <Typography variant="body1">
                  {checkinDate} - {checkoutDate}
                </Typography>
              </Box>

              {/* Guest Details */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Person color="primary" />
                <Typography variant="body1">
                  {numberOfAdults} Adults, {numberOfChild} Children
                </Typography>
              </Box>

              {/* Divider */}
              <Divider sx={{ my: 2 }} />

              {/* Payment Info */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CreditCard color="primary" />
                <Typography variant="body1" fontWeight="bold">
                  Total: {currency} {amount}
                </Typography>
              </Box>

              {/* Payment Button */}
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handlePayment}>
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p style={{ color: "red" }}>Invalid amount. Please check your booking.</p>
      )}
    </div>
  );
};

export default Payment;
