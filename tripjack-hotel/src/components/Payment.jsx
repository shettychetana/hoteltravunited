// import React from "react";
// import { Link } from "react-router-dom";
// import { Container, Card, CardContent, Typography, Button, Box } from "@mui/material";
// const primaryColor = "#FF6748";
// const Payment = () => {
// return (
// <Container>
// <Card sx={{ marginTop: 10 }}>
// <CardContent>hy</CardContent>
// </Card>
// </Container>
// );
// };
// export default Payment;
// import React, { useEffect } from 'react';
// import { createOrder } from '../services/razorpayService';

// const Payment = () => {
//     const { hotelData, message } = location.state || {};
//     const handlePayment = async () => {
//         try {
//             const orderData = await createOrder(500); // Amount in smallest currency unit (e.g., paise for INR)
//             const options = {
//                 key: process.env.REACT_APP_RAZORPAY_ID_KEY, // Your Razorpay key
//                 amount: orderData.amount,
//                 currency: orderData.currency,
//                 name: "Your Company Name",
//                 description: "Test Transaction",
//                 order_id: orderData.id,
//                 handler: function (response) {
//                     alert(`Payment successful: ${response.razorpay_payment_id}`);
//                 },
//                 prefill: {
//                     name: "Customer Name",
//                     email: "customer@example.com",
//                     contact: "9999999999"
//                 },
//                 notes: {
//                     address: "Customer Address"
//                 },
//                 theme: {
//                     color: "#F37254"
//                 }
//             };

//             const razorpay = new window.Razorpay(options);
//             razorpay.open();
//         } catch (error) {
//             console.error("Payment failed:", error);
//         }
//     };

//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.async = true;
//         script.onload = handlePayment;
//         document.body.appendChild(script);
//     }, []);

//     return (
//         <div>
//             <h1>Payment Page</h1>
//             <button onClick={handlePayment}>Pay Now</button>
//         </div>
//     );
// };

// export default Payment;
// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { createOrder } from '../services/razorpayService';

// const Payment = () => {
//     const location = useLocation();
//     const { hotelPayment } = location.state || {}; // Access the hotel payment data

//     const handlePayment = async () => {
//         try {
//             const orderData = await createOrder(500); // Amount in smallest currency unit (e.g., paise for INR)
//             const options = {
//                 key: process.env.REACT_APP_RAZORPAY_ID_KEY, // Your Razorpay key
//                 amount: orderData.amount,
//                 currency: orderData.currency,
//                 name: "Your Company Name",
//                 description: "Test Transaction",
//                 order_id: orderData.id,
//                 handler: function (response) {
//                     alert(`Payment successful: ${response.razorpay_payment_id}`);
//                 },
//                 prefill: {
//                     name: "Customer Name",
//                     email: "customer@example.com",
//                     contact: "9999999999"
//                 },
//                 notes: {
//                     address: "Customer Address"
//                 },
//                 theme: {
//                     color: "#F37254"
//                 }
//             };

//             const razorpay = new window.Razorpay(options);
//             razorpay.open();
//         } catch (error) {
//             console.error("Payment failed:", error);
//         }
//     };

//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.async = true;
//         script.onload = handlePayment;
//         document.body.appendChild(script);
//     }, []);

//     return (
//         <div>
//             <h1>Payment Page</h1>
//             <button onClick={handlePayment}>Pay Now</button>
//             {hotelPayment && (
//                 <div>
//                     <h2>Payment Details</h2>
//                     <pre>{JSON.stringify(hotelPayment, null, 2)}</pre>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Payment;
import { useEffect } from "react";
import axios from "axios";

const Payment = () => {
  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/create-order", {
        amount: 500, // Amount in INR
      });

      const options = {
        key: "rzp_test_7knSOHZmMk60tN", // Use only the Key ID here
        amount: data.amount,
        currency: data.currency,
        name: "Your Company",
        description: "Payment for Order #123",
        order_id: data.id,
        handler: async function (response) {
          const verifyRes = await axios.post("http://localhost:5000/verify-payment", {
            order_id: data.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            alert("Payment Successful!");
          } else {
            alert("Payment Verification Failed");
          }
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div>
      <h2>Razorpay Payment</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
