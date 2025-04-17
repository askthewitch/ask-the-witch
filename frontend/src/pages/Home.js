import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style.css";
import Layout from "../components/Layout";

function Home() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleGoClick = () => {
    console.log("handleGoClick function called"); // Added log
    if (prompt.trim() !== "") {
      if ('vibrate' in navigator) {
        console.log("navigator.vibrate is supported"); // Added log
        navigator.vibrate(50); // Short vibration on click
      } else {
        console.log("navigator.vibrate is NOT supported"); // Added log
      }
      navigate("/loading", { state: { prompt } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGoClick(); // Call handleGoClick on form submission
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">AsktheWitch.com</h1>
        <p className="subtitle">
          She knows the AI you need — tell her your idea and watch the magic ✨
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            className="input"
            placeholder="Enter your idea or question here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit" className="cta" onClick={handleGoClick}>
            Go
          </button>
        </form>

        <footer>© askthewitch.com 2025 ✨</footer>
      </div>
    </Layout>
  );
}

export default Home;