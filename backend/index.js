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
  "https://your-vercel-frontend-url.vercel.app", // replace with actual if needed
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, Postman)
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

app.post("/send-email", async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    const data = await resend.emails.send({
      from: "Ask the Witch <noreply@askthewitch.com>",
      to,
      subject,
      html,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Email send failed:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Ask the Witch backend is working! 🧙‍♀️");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});