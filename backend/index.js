const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Resend } = require("resend");
require("dotenv").config();
const Airtable = require('airtable');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(process.env.AIRTABLE_BASE_ID);

const allowedOrigins = [
  "http://localhost:3000",
  "https://askthewitch.com",
  "https://www.askthewitch.com",
  "https://ask-the-witch.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.options('/api/send-email', cors(corsOptions), (req, res) => {
  res.sendStatus(204);
});

app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, html, prompt } = req.body;

    const data = await resend.emails.send({
      from: "Ask the Witch <noreply@askthewitch.com>",
      to: to,
      subject: subject,
      html: html,
    });

    await base('Prompts').create({
      "Prompt Text": prompt,
      "Email": to,
      "Timestamp": new Date().toISOString()
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error sending email or saving to Airtable:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/archive-prompts", async (req, res) => {
  try {
    const archiveData = await base('prompts-archive-data').select({
      fields: ['User Prompt', 'AI Results', 'Time'], 
      sort: [{ field: 'Timestamp', direction: 'desc' }]
    }).all();

    const formattedArchiveData = archiveData.map(record => ({
      userPrompt: record.get('User Prompt'),
      aiResult: record.get('AI Result'),
      timestamp: record.get('Timestamp')
    }));

    res.json(formattedArchiveData);
  } catch (error) {
    console.error("Error fetching archive prompts from Airtable:", error);
    res.status(500).json({ error: 'Failed to fetch archive prompts' });
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