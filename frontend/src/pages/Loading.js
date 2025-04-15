import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout"; // adjust if needed
import "../style.css";

function Loading() {
  const navigate = useNavigate();
  const [gifUrl, setGifUrl] = useState("");

  const gifs = [
    "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExODkxNmx4OWsweWZnYm5uZzhoaDFscThocHB0cHVkOTU0ODF1bW5uOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BIo5QXYD7LGbm/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnJqMHRpb3E2dGdxaHZxNzB3aWhoaWUxbGdlN3UwYnR0bnZlNnlnbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bbshzgyFQDqPHXBo4c/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWYwcWNzNDBja3lkZm91NGt1dmhsM3JhYTZ1ZDI0ZHlwbnc3NXYydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wW95fEq09hOI8/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGR0aDJib2xpNjNnZzB5Z2lwOW8ybGt2N2ljaTBjaTQzN2d0c3BzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GFHJXPCoVQEec/giphy.gif",
    "https://media.giphy.com/media/nfLpqTrNPpqcE/giphy.gif?cid=ecf05e47ithij5fgjxzwynqm8hegbvr74cd9syj89x7b2gc7&ep=v1_gifs_related&rid=giphy.gif&ct=g",
    "https://media.giphy.com/media/ksjkT89RbdlIs/giphy.gif?cid=ecf05e471wkrrj68b48mm0jsso5i0f2u0fi6tpjatasibt4q&ep=v1_gifs_related&rid=giphy.gif&ct=g",
  ];

  useEffect(() => {
    // Pick a random GIF when the component mounts
    const randomIndex = Math.floor(Math.random() * gifs.length);
    setGifUrl(gifs[randomIndex]);

    const timer = setTimeout(() => {
      navigate("/results");
    }, 3500); // 3.5 seconds

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