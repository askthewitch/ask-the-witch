const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ CORS SETUP
const allowedOrigins = [
  "http://localhost:3000",
  "https://askthewitch.com",
  "https://www.askthewitch.com",
  // Add your Render frontend URL here once it's deployed
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}));

app.use(bodyParser.json());

app.post("/api/send-email", async (req, res) => {
  // ... your email sending logic ...
});

// ✅ Test route
app.get("/api/", (req, res) => {
  res.send("Ask the Witch backend is working! 🧙‍♀️");
});

// ✅ Start the server on the port provided by Render
const PORT = process.env.PORT || 5000; // Render provides PORT env variable
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;