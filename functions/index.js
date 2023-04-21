const functions = require("firebase-functions");
const express = require("express");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const cors = require("cors");
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_pJnACGFAMxAceV",
  key_secret: "jYcD7Y23hQVzAKYcoESROHzz",
});

const payment_capture = 1;
const currency = "INR";
const amount = 5;

app.get("/", (req, res) => {
  res.send("okay");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  const options = {
    amount: total,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    res.send({
      amount: options.amount,
      id: response.id,
    });
  } catch (error) {
    error;
  }
});

exports.api = functions.https.onRequest(app);
