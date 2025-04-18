import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Set background image using JavaScript
document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL}/images/backgroundthewitch.png)`;
document.body.style.backgroundRepeat = 'repeat';
document.body.style.backgroundSize = 'auto';
document.body.style.backgroundAttachment = 'fixed'; // Optional