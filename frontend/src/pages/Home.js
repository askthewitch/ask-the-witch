import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../style.css";
import Layout from "../components/Layout";
import ContactModal from "../components/ContactModal"; // Import the modal component

function Home() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [messageSent, setMessageSent] = useState(false); // You might want to remove this state

  const handleGoClick = () => {
    // ... (rest of your handleGoClick function) ...
  };

  const handleSubmit = (e) => {
    // ... (rest of your handleSubmit function) ...
  };

  const openContactModal = () => {
    setShowModal(true);
    setMessageSent(false); // Reset message sent state (consider removing)
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