import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../style.css";
import Layout from "../components/Layout";
import ContactModal from "../components/ContactModal"; // Import the modal component

function Home() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [contactQuestion, setContactQuestion] = useState("");
  const [contactEmail, setContactEmail] = useState("");

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

  const openContactModal = () => {
    setShowModal(true);
    setMessageSent(false); // Reset message sent state when opening modal
    setContactQuestion(""); // Clear previous question
    setContactEmail("");   // Clear previous email
  };

  const closeContactModal = () => {
    setShowModal(false);
  };

  const handleSendMessage = () => {
    // In a real application, you would send this data to a server
    console.log("Question:", contactQuestion);
    console.log("Email:", contactEmail);

    // For this simple version, just show a message and close the modal
    setMessageSent(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2000); // Show message for 2 seconds
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
          <Link to="/privacy">Privacy &amp; Terms</Link>
          <Link to="/about">About the Witch</Link>
          <span onClick={openContactModal} style={{ cursor: 'pointer' }}>Contact</span>
        </footer>

        {showModal && (
          <ContactModal
            question={contactQuestion}
            email={contactEmail}
            onQuestionChange={(e) => setContactQuestion(e.target.value)}
            onEmailChange={(e) => setContactEmail(e.target.value)}
            onSend={handleSendMessage}
            onClose={closeContactModal}
            messageSent={messageSent}
          />
        )}
      </div>
    </Layout>
  );
}

export default Home;