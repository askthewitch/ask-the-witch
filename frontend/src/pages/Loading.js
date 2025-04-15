import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout"; // adjust if needed
import "../style.css";

function Loading() {
  const navigate = useNavigate();
  const [gifUrl, setGifUrl] = useState("");

  const gifs = [
    "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    "https://media.giphy.com/media/3o7bu4Fgl0sVn3jPdm/giphy.gif",
    "https://media.giphy.com/media/xTk9ZvMnb7wyurAfra/giphy.gif",
    // Add more GIF URLs here!
  ];

  useEffect(() => {
    // Pick a random GIF when the component mounts
    const randomIndex = Math.floor(Math.random() * gifs.length);
    setGifUrl(gifs[randomIndex]);

    const timer = setTimeout(() => {
      navigate("/results");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate, gifs]); // Added 'gifs' to the dependency array

  return (
    <Layout>
      <div className="container">
        <h2>Summoning your magic...</h2>
        {gifUrl && (
          <img
            src={gifUrl}
            alt="Loading Witch"
            style={{ width: "400px", marginTop: "20px" }}
          />
        )}
      </div>
    </Layout>
  );
}

export default Loading;