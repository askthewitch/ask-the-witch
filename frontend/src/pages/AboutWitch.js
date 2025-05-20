import React from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import Layout from '../components/Layout';
import '../style.css'; // Assuming you want to use your global styles for the button

function AboutWitch() {
  return (
    <Layout>
      <div className="container">
        <h1>About the Witch</h1>
        <p>The Witch of AskTheWitch.com is a mystical guide in the ever-expanding universe of AI. She dedicates her arcane knowledge to unearthing the most potent and current AI tools, precisely tailored to your unique entrepreneurial visions, whether you dream of an online SEO company for clothing retailers or a thriving fitness website. By intuitively connecting your aspirations with cutting-edge AI capabilities, she conjures clarity from complexity, ensuring you embark on your journey equipped with the perfect digital enchantments to transform your ideas into reality.</p>
        
        {/* New Home button */}
        <Link to="/" className="cta"> {/* Use Link component with 'cta' class for styling */}
          Home
        </Link>
      </div>
    </Layout>
  );
}

export default AboutWitch;