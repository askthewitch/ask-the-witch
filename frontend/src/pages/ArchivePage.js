// frontend/src/pages/ArchivePage.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom'; 
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
        const jsonData = await response.json();
        setArchiveData(jsonData);
        console.log('Data received:', jsonData); // Log the raw JSON data
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
        {/* ... loading UI ... */}
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        {/* ... error UI ... */}
      </Layout>
    );
  }

  console.log('archiveData state:', archiveData); // Keep this as well

  return (
    <Layout>
      {/* ... rendering logic ... */}
      <div className="container archive-page">
        <Link to="/" className="title results-title-link">
                  AskTheWitch.com<span style={{ fontFamily: 'Roboto, sans-serif', fontStyle: 'normal' }}></span>
                </Link>
        <h1 style="text-align: center;">User-Generated AI Prompts</h1>
        <p className="archive-intro">Explore prompts entered and shared by our community.</p>
                <ul className="prompt-list">
          {archiveData.map((item, index) => (
            <li key={index} className="prompt-item">
              <strong>User Prompt:</strong> {item.userPrompt}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default ArchivePage;