import { useNavigate } from "react-router-dom";
import "../style.css";

function Home() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/loading");
  };

  return (
    <div className="home-bg">
      <div className="container">
        <h1 className="title">Ask the Witch</h1>
        <p className="subtitle">
          She knows the AI you need, tell her your idea and watch the magic ✨
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
          />
          <button type="submit" className="cta">
            Go
          </button>
        </form>

        <footer>© askthewitch.com 2025</footer>
      </div>
    </div>
  );
}

export default Home;