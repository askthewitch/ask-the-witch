import './style.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Loading from './pages/Loading';
import Results from './pages/Results';
import PrivacyTerms from './pages/PrivacyTerms';
import AboutWitch from './pages/AboutWitch';
import TermsOfService from './pages/TermsOfService';
import backgroundImage from '../public/images/backgroundthewitch.png'; // Import the image

function App() {
  return (
    <Router>
      <div className="page-wrapper" style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'repeat', backgroundSize: 'auto', backgroundAttachment: 'fixed' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/results" element={<Results />} />
          <Route path="/privacy" element={<PrivacyTerms />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/about" element={<AboutWitch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;