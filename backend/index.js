const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

const allowedOrigins = [
  "http://localhost:3000",
  "https://askthewitch.com",
  "https://www.askthewitch.com",
  "https://ask-the-witch.vercel.app",
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
  try {
    const { to, subject, html } = req.body;
    const data = await resend.emails.send({
      from: "Ask the Witch <noreply@askthewitch.com>",
      to: to,
      subject: subject,
      html: html,
    });

    res.setHeader('Access-Control-Allow-Origin', req.headers.origin); // <---- TRY THIS
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin); // <---- AND THIS
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/", (req, res) => {
  res.send("Ask the Witch backend is working! 🧙‍♀️");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;