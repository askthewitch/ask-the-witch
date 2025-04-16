import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import "../style.css";

const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://ask-the-witch-backend.onrender.com";

function Results() {
  const location = useLocation();
  const prompt = location.state?.prompt || "your idea";

  const tools = [
    {
      name: "Durable",
      oneLiner: "Build a full website in 30 seconds with AI.",
      why: "Since you're launching a service-based business, Durable gets you online instantly with a clean, professional site—no coding, no waiting.",
      pros: ["Super fast setup", "Includes CRM and invoicing tools"],
      cons: ["Limited design customization", "Free version is limited"],
    },
    {
      name: "Ocoya",
      oneLiner: "AI-powered content creation and social media scheduling.",
      why: "Ocoya helps you create and schedule social posts *for your niche* so you can build an audience while you work on the backend.",
      pros: ["Supports many platforms", "Includes AI captions and hashtags"],
      cons: ["Not great for deep analytics", "Paid plans add up"],
    },
    {
      name: "Tome",
      oneLiner: "Create pitch decks and landing pages with AI storytelling.",
      why: "Perfect for pitching your idea, creating client proposals, or even planning a launch page—Tome helps tell your story beautifully, fast.",
      pros: ["Beautiful templates", "Collaborative interface"],
      cons: ["Exporting can be tricky", "Not as customizable as PowerPoint"],
    },
  ];

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailStatus, setEmailStatus] = useState("idle");

  const handleEmailSend = async () => {
    const summaryHtml = `
      <h2>Your AI Summary for "${prompt}"</h2>
      <p>Here are the tools we suggest:</p>
      <ul>
        ${tools
          .map(
            (tool) => `
              <li>
                <strong>${tool.name}</strong><br/>
                <em>${tool.oneLiner}</em><br/>
                <p><strong>Why:</strong> ${tool.why}</p>
                <p>✅ <strong>Pros:</strong> ${tool.pros.join(", ")}</p>
                <p>⚠️ <strong>Cons:</strong> ${tool.cons.join(", ")}</p>
              </li><br/>
            `
          )
          .join("")}
      </ul>
    `;

    try {
      setEmailStatus("sending");

      const response = await fetch(`${serverUrl}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: `✨ Your Ask the Witch AI Summary`,
          html: summaryHtml,
          prompt: prompt,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setEmailSent(true);
        setEmail("");
        setEmailStatus("sent");
      } else {
        setEmailStatus("error");
      }
    } catch (err) {
      console.error(err);
      setEmailStatus("error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEmailSend();
    }
  };

  console.log("Results component rendered"); // <----- ADDED LOG

  return (
    <Layout>
      <div className="results-container">
        <h2 className="results-title">✨ Your Magic Recipe Awaits ✨</h2>
        <p className="results-intro">
          Based on what you told me—<strong>{prompt}</strong>—here’s what I’d brew up for you:
        </p>

        <div className="tool-list">
          {console.log("Mapping over tools:", tools)} {/* <----- ADDED LOG */}
          {tools.map((tool, index) => (
            <div className="tool-card" key={index}>
              <h3 className="tool-name">{tool.name}</h3>
              <p className="tool-oneliner">🧰 {tool.oneLiner}</p>
              <p className="tool-why"><strong>Why it helps:</strong> {tool.why}</p>
              <ul className="tool-pros-cons">
                <li><strong>✅ Pros:</strong> {tool.pros.join(", ")}</li>
                <li><strong>⚠️ Cons:</strong> {tool.cons.join(", ")}</li>
              </ul>
            </div>
          ))}
        </div>

        {console.log("Rendering floating summary box")} {/* <----- ADDED LOG */}
        <div className="floating-summary-box">
          <h3 className="floating-title">✨ Save this summary:</h3>
          <div className="floating-summary-buttons">
            {!emailSent ? (
              <>
                <input
                  className="email-input"
                  type="email"
                  placeholder="Email to yourself"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="cta" onClick={handleEmailSend}>
                  📩 Send to Email
                </button>
              </>
            ) : (
              <p style={{ color: "limegreen" }}>✅ Sent!</p>
            )}
            <button className="cta">💻 Download Summary Now</button>
            {emailStatus === "error" && (
              <p style={{ color: "red" }}>⚠️ Something went wrong. Try again?</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Results;