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
    { name: "Durable", oneLiner: "...", why: "...", pros: [], cons: [] },
    { name: "Ocoya", oneLiner: "...", why: "...", pros: [], cons: [] },
    { name: "Tome", oneLiner: "...", why: "...", pros: [], cons: [] },
  ];

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailStatus, setEmailStatus] = useState("idle");

  console.log("Results component rendered");
  console.log("Prompt received:", prompt);
  console.log("Tools array:", tools);

  // ... your handleEmailSend and other functions ...

  return (
    <Layout>
      <div className="results-container">
        <h2 className="results-title">✨ Your Magic Recipe Awaits ✨</h2>
        <p className="results-intro">
          Based on what you told me—<strong>{prompt}</strong>—here’s what I’d brew up for you:
        </p>

        <div className="tool-list">
          {console.log("Mapping over tools")}
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

        {/* ... rest of your component ... */}
      </div>
    </Layout>
  );
}

export default Results;