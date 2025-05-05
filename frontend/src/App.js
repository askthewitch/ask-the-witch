import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import ArchivePage from './pages/ArchivePage';
import AboutWitch from './pages/AboutWitch';
import ContactModal from './components/ContactModal';
import PrivacyTerms from './pages/PrivacyTerms';
import TermsOfService from './pages/TermsOfService';
import Loading from './pages/Loading';
import Layout from './components/Layout';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <Router>
      <Layout> {/* Assuming Layout wraps your main content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/prompts" element={<ArchivePage />} />
          <Route path="/about" element={<AboutWitch />} />
          <Route path="/contact" element={<ContactModal />} />
          <Route path="/privacy" element={<PrivacyTerms />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </Layout>
    </Router>
  );
}

export default App;