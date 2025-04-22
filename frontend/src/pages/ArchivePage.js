// frontend/src/pages/ArchivePage.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../style.css';
import { Helmet } from 'react-helmet-async';

function ArchivePage() {
  const [archiveData, setArchiveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArchivePrompts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://ask-the-witch-backend.onrender.com/api/archive-prompts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArchiveData(data);
        setLoading(false);
      } catch (e) {
        setError('Failed to load archive prompts.');
        setLoading(false);
      }
    };

    fetchArchivePrompts();
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
          {archiveData.map((item, index) => (
            <li key={index} className="prompt-item">
              <strong>User Prompt:</strong> {item.userPrompt}<br />
              <strong>AI Result:</strong> {item.aiResult}<br />
              <small>Timestamp: {new Date(item.timestamp).toLocaleString()}</small><br />
              {item.keywords && item.keywords.length > 0 && (
                <div className="keywords">
                  <strong>Keywords:</strong>
                  {item.keywords.map((keyword, key) => (
                    <span key={key} className="keyword-tag">{keyword}</span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default ArchivePage;