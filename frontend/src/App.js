import "./style.css";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Results from "./pages/Results";
import PrivacyTerms from './pages/PrivacyTerms';
import AboutWitch from './pages/AboutWitch';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/results" element={<Results />} />
          <Route path="/privacy" element={<PrivacyTerms />} /> {/* Add this route */}
          <Route path="/terms" element={<TermsOfService />} /> {/* Add this route */}
          <Route path="/about" element={<AboutWitch />} />   {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;