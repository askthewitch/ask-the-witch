import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout"; // adjust if needed
import "../style.css";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/results");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout>
      <div className="container">
        <h2>Summoning your magic...</h2>
        <img
          src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
          alt="Loading Witch"
          style={{ width: "400px", marginTop: "20px" }}
        />
      </div>
    </Layout>
  );
}

export default Loading;