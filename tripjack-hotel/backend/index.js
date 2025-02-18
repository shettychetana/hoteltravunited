
// const express = require("express");
// const Razorpay = require("razorpay");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const razorpay = new Razorpay({
//   key_id: "rzp_live_COgMwy0zi5Mx1j", // <-- Directly use your key
//   key_secret: "uSt6k2RSXsKFP04Ff3Q1BzXK",
// });

// app.post("/create-order", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const options = {
//       amount: amount * 100, // Convert INR to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = 5000; // Keep your backend running on port 5000
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require("dotenv").config(); // Load .env variables

const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Secure Razorpay keys using environment variables
const razorpay = new Razorpay({
  key_id: "rzp_live_COgMwy0zi5Mx1j",
  key_secret:"uSt6k2RSXsKFP04Ff3Q1BzXK",
});
// RAZORPAY_KEY_ID=rzp_live_COgMwy0zi5Mx1j
// RAZORPAY_KEY_SECRET=uSt6k2RSXsKFP04Ff3Q1BzXK
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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
