// const express = require('express');
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const Razorpay = require("razorpay")

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// app.get('/', (req, res) => {
//     res.send("Hello World!");
// })

// app.post('/orders', async(req, res) => {
//     const razorpay = new Razorpay({
//         key_id: "rzp_test_7knSOHZmMk60tN",
//         key_secret: "1xWH0VfXwAcf1zz7saV22JPV"
//     })

//     const options = {
//         amount: req.body.amount,
//         currency: req.body.currency,
//         receipt: "receipt#1",
//         payment_capture: 1
//     }

//     try {
//         const response = await razorpay.orders.create(options)

//         res.json({
//             order_id: response.id,
//             currency: response.currency,
//             amount: response.amount
//         })
//     } catch (error) {
//         res.status(500).send("Internal server error")
//     }
// })

// app.get("/payment/:paymentId", async(req, res) => {
//     const {paymentId} = req.params;

//     const razorpay = new Razorpay({
//         key_id: "rzp_test_7knSOHZmMk60tN",
//         key_secret: "1xWH0VfXwAcf1zz7saV22JPV"
//     })
    
//     try {
//         const payment = await razorpay.payments.fetch(paymentId)

//         if (!payment){
//             return res.status(500).json("Error at razorpay loading")
//         }

//         res.json({
//             status: payment.status,
//             method: payment.method,
//             amount: payment.amount,
//             currency: payment.currency
//         })
//     } catch(error) {
//         res.status(500).json("failed to fetch")
//     }
// })


// app.listen(port, () => {
//     console.log(`server is running on ${port}`);
// })
// const express = require('express');
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const Razorpay = require("razorpay");

// const app = express();
// const port = 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// // ✅ Debugging: Log incoming requests
// app.use((req, res, next) => {
//     console.log(`[${req.method}] ${req.url}`, req.body);
//     next();
// });

// // ✅ Test Route
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// // ✅ Razorpay Order Route
// app.post("/orders", async (req, res) => {
//     console.log("Received request at /orders:", req.body); // Debugging

//     const razorpay = new Razorpay({
//         key_id: "rzp_live_COgMwy0zi5Mx1j",
//         key_secret: "uSt6k2RSXsKFP04Ff3Q1BzXK"
//     });

//     const options = {
//         amount: req.body.amount,
//         currency: req.body.currency,
//         receipt: "receipt#1",
//         payment_capture: 1
//     };

//     try {
//         const response = await razorpay.orders.create(options);
//         console.log("✅ Order Created:", response);
//         res.json({
//             order_id: response.id,
//             currency: response.currency,
//             amount: response.amount
//         });
//     } catch (error) {
//         console.error("❌ Error creating order:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // ✅ Start Server
// app.listen(port, () => {
//     console.log(`🚀 Server is running on http://localhost:${port}`);

//     // ✅ Log all available routes after server starts
//     app._router.stack.forEach((r) => {
//         if (r.route && r.route.path) {
//             console.log(`[${r.route.stack[0].method.toUpperCase()}] ${r.route.path}`);
//         }
//     });
// });

// require("dotenv").config();
// const express = require("express");
// const Razorpay = require("razorpay");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID, // Store API keys in .env
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// app.post("/create-order", async (req, res) => {
//   try {
//     const { amount } = req.body;
    
//     const options = {
//       amount: amount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_live_COgMwy0zi5Mx1j", // <-- Directly use your key
  key_secret: "uSt6k2RSXsKFP04Ff3Q1BzXK",
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Convert INR to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000; // Keep your backend running on port 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
