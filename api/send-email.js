// /api/send-email.js

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { to, subject, html } = req.body;

  // Validate input
  if (!to || !subject || !html) {
    return res.status(400).json({
      success: false,
      message: "Missing 'to', 'subject', or 'html' in request body",
    });
  }

  try {
    const data = await resend.emails.send({
      from: "Ask the Witch <noreply@askthewitch.com>",
      to,
      subject,
      html,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("❌ Email sending failed:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Email service failed. Please try again later.",
      error: error?.message || "Unknown error",
    });
  }
}
