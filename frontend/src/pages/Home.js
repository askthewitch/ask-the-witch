import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../style.css";
import Layout from "../components/Layout";
import ContactModal from "../components/ContactModal"; // Import the modal component

function Home() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleGoClick = () => {
    if (prompt.trim() !== "") {
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      navigate("/loading", { state: { prompt } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    handleGoClick();     // Call the navigation function
  };

  const openContactModal = () => {
    setShowModal(true);
  };

  const closeContactModal = () => {
    setShowModal(false);
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

        <footer>
          © askthewitch.com 2025 ✨
          <Link to="/privacy">Privacy</Link>
          <Link to="/about">About the Witch</Link>
          <Link to="/terms">Terms</Link>
          <span onClick={openContactModal} style={{ cursor: 'pointer' }}>Contact</span>
          <Link to="/prompts/" style={{ marginLeft: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>Archive</Link>
        </footer>

        {showModal && (
          <ContactModal
            onClose={closeContactModal}
          />
        )}
      </div>
    </Layout>
  );
}

export default Home;