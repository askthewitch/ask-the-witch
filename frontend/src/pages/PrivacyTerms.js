import React from 'react';
import Layout from '../components/Layout';

function PrivacyTerms() {
  return (
    <Layout>
      <div className="container">
        <h1>Privacy Policy</h1>
        {/* Your privacy policy content here */}
        <p>This is our privacy policy...</p>

        <h1>Terms of Service</h1>
        {/* Your terms of service content here */}
        <p>These are our terms of service...</p>
      </div>
    </Layout>
  );
}

export default PrivacyTerms;