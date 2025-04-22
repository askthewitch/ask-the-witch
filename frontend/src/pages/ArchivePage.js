import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../style.css'; // Or create ArchivePage.module.css for specific styles
import { Helmet } from 'react-helmet-async'; // For setting title and meta description

function ArchivePage() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Placeholder for fetching prompts from the backend
    const fetchPrompts = async () => {
      setLoading(true);
      try {
        // Simulate fetching data (replace with actual API call later)
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockPrompts = [
          { text: "A whimsical prompt about a talking cat." },
          { text: "Generate a business idea for sustainable pet toys." },
          { text: "Write a short poem about a lonely robot." },
        ];
        setPrompts(mockPrompts);
        setLoading(false);
      } catch (e) {
        setError("Failed to load prompts.");
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Helmet>
          <title>User-Generated AI Prompts | AskTheWitch.com</title>
          <meta name="description" content="Explore a vast collection of user-submitted AI prompts for creative inspiration, business ideas, and more. Discover unique prompts shared by the AskTheWitch.com community." />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <div className="container archive-page">
          <h1>User-Generated AI Prompts</h1>
          <p className="archive-intro">Loading prompts...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Helmet>
          <title>User-Generated AI Prompts | AskTheWitch.com</title>
          <meta name="description" content="Explore a vast collection of user-submitted AI prompts for creative inspiration, business ideas, and more. Discover unique prompts shared by the AskTheWitch.com community." />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <div className="container archive-page">
          <h1>User-Generated AI Prompts</h1>
          <p className="archive-intro error">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>User-Generated AI Prompts | AskTheWitch.com</title>
        <meta name="description" content="Explore a vast collection of user-submitted AI prompts for creative inspiration, business ideas, and more. Discover unique prompts shared by the AskTheWitch.com community." />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="container archive-page">
        <h1>User-Generated AI Prompts</h1>
        <p className="archive-intro">Explore prompts shared by our community.</p>
        <ul className="prompt-list">
          {prompts.map((prompt, index) => (
            <li key={index} className="prompt-item">
              {prompt.text}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default ArchivePage;