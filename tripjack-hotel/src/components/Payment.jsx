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
import React from "react";
const Payment = () => {
  const [responseId, setResponseId] = React.useState("");
  const [responseState, setResponseState] = React.useState([]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script);
    })
  }

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR"
    })

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/orders",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
      handleRazorpayScreen(response.data.amount)
    })
    .catch((error) => {
      console.log("error at", error)
    })
  }

  const handleRazorpayScreen = async(amount) => {
    const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      alert("Some error at razorpay screen loading")
      return;
    }

    const options = {
      key: 'rzp_test_GcZZFDPP0jHtC4',
      amount: amount,
      currency: 'INR',
      name: "papaya coders",
      description: "payment to papaya coders",
      image: "https://papayacoders.com/demo.png",
      handler: function (response){
        setResponseId(response.razorpay_payment_id)
      },
      prefill: {
        name: "papaya coders",
        email: "papayacoders@gmail.com"
      },
      theme: {
        color: "#F4C430"
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  const paymentFetch = (e) => {
    e.preventDefault();

    const paymentId = e.target.paymentId.value;

    axios.get(`http://localhost:3000/payment/${paymentId}`)
    .then((response) => {
      console.log(response.data);
      setResponseState(response.data)
    })
    .catch((error) => {
      console.log("error occures", error)
    })
  }

 

  
  return (
    <div>
      <h2>Razorpay Payment</h2>
      <button onClick={() => createRazorpayOrder(100)}>Payment of 100Rs.</button>
      {responseId && <p>{responseId}</p>}
      <h1>This is payment verification form</h1>
      <form onSubmit={paymentFetch}>
        <input type="text" name="paymentId" />
        <button type="submit">Fetch Payment</button>
        {responseState.length !==0 && (
          <ul>
            <li>Amount: {responseState.amount / 100} Rs.</li>
            <li>Currency: {responseState.currency}</li>
            <li>Status: {responseState.status}</li>
            <li>Method: {responseState.method}</li>
          </ul>
        )}
      </form>
    </div>
  );
};

export default Payment;
