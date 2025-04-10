import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style.css";
import Layout from "../components/Layout"; // make sure this path is correct

function Home() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() !== "") {
      navigate("/loading", { state: { prompt } });
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Ask the Witch</h1>
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
            placeholder="Enter your question"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit" className="cta">
            Go
          </button>
        </form>

        <footer>© askthewitch.com 2025</footer>
      </div>
    </Layout>
  );
}

export default Home;