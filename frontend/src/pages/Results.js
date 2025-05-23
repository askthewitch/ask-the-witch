import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"; // Added useNavigate
import Layout from "../components/Layout";
import "../style.css";

const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://ask-the-witch-backend.onrender.com";

function Results() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const prompt = location.state?.prompt || "your idea";
  const checkboxRef = useRef(null);

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
  const [gdprChecked, setGdprChecked] = useState(false);
  const [gdprError, setGdprError] = useState("");
  const [sendConfirmation, setSendConfirmation] = useState("");

  useEffect(() => {
    if (emailStatus === "sent") {
      setSendConfirmation("Email sent successfully! Please check your inbox (it might take a few minutes).");
      setTimeout(() => setSendConfirmation(""), 5000);
    } else if (emailStatus === "error") {
      setSendConfirmation("Something went wrong. Please try again or ensure your email is correct.");
      setTimeout(() => setSendConfirmation(""), 5000);
    }
  }, [emailStatus]);

  const handleCheckboxChange = (event) => {
    setGdprChecked(event.target.checked);
    setGdprError("");
  };

  const highlightCheckbox = () => {
    if (checkboxRef.current) {
      checkboxRef.current.classList.add('highlight-checkbox');
      setTimeout(() => checkboxRef.current.classList.remove('highlight-checkbox'), 1000);
    }
  };

  const handleEmailSend = async () => {
    if (!gdprChecked) {
      setGdprError("Please tick the box to confirm you agree to the terms.");
      highlightCheckbox();
      return;
    }

    if (emailStatus === "sending") return; // Prevent multiple sends

    setSendConfirmation("");
    setEmailStatus("sending");
    setEmailSent(false);

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
      e.preventDefault();
      if (gdprChecked) {
        handleEmailSend();
      } else {
        setGdprError("Please tick the box to confirm you agree to the terms.");
        highlightCheckbox();
      }
    }
  };

  const handleStartAgain = () => {
    navigate('/'); // Navigates back to the home page
  };

  console.log("Results component rendered");

  return (
    <Layout>
      <div className="results-container">
        <Link to="/" className="title results-title-link">
          AskTheWitch.com<span style={{ fontFamily: 'Roboto, sans-serif', fontStyle: 'normal' }}></span>
        </Link>
        <p className="results-intro">
          Based on what you told me—<strong>{prompt}</strong>—here’s what I’d brew up for you:
        </p>

        <div className="tool-list">
          {console.log("Mapping over tools:", tools)}
          {tools.map((tool, index) => (
            <div className="tool-card" key={index}>
              <h3 className="tool-name">{tool.name}</h3>
              <p className="tool-oneliner">🧰 {tool.oneliner}</p>
              <p className="tool-why"><strong>Why it helps:</strong> {tool.why}</p>
              <ul className="tool-pros-cons">
                <li><strong>✅ Pros:</strong> {tool.pros.join(", ")}</li>
                <li><strong>⚠️ Cons:</strong> {tool.cons.join(", ")}</li>
              </ul>
            </div>
          ))}
        </div>

        {console.log("Rendering floating summary box")}
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
                <p className="gdpr-text">
                  We will use your email to send you this summary. By ticking this box, you consent to us occasionally sending you updates or sponsored content related to Ask the Witch. You can unsubscribe at any time.
                </p>
                <label className="gdpr-label">
                  <input
                    type="checkbox"
                    checked={gdprChecked}
                    onChange={handleCheckboxChange}
                    ref={checkboxRef}
                  />
                  I consent to the above. Please allow sufficient time for email to send and arrive, do not close this page whilst sending.
                </label>
                {gdprError && <p className="error-message">{gdprError}</p>}
                <button
                  className="cta"
                  onClick={handleEmailSend}
                  disabled={emailStatus === "sending"}
                >
                  {emailStatus === "sending" ? "Sending..." : "📩 Send to Email"}
                </button>
                {sendConfirmation && <p className="send-confirmation">{sendConfirmation}</p>}
              </>
            ) : (
              <p style={{ color: "limegreen" }}>✅ Sent!</p>
            )}
            {/* New "Start Again" button added here */}
            <button
              className="cta"
              onClick={handleStartAgain}
            >
              Start Again
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Results;