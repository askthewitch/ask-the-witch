import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { HelmetProvider } from 'react-helmet-async'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);


document.body.style.backgroundImage = `url(${process.env.PUBLIC_URL}/images/backgroundthewitch.png)`;
document.body.style.backgroundRepeat = 'repeat';
document.body.style.backgroundSize = 'auto';
document.body.style.backgroundAttachment = 'fixed'; 