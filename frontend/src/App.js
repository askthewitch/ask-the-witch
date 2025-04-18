import "./style.css";
import "./App.css"; // <-- Import this too so both styles are included
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Results from "./pages/Results";
import PrivacyTerms from './pages/PrivacyTerms';
import AboutWitch from './pages/AboutWitch';

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;