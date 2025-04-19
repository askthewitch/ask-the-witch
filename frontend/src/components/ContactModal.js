import React from 'react';
import styles from './ContactModal.module.css'; // You'll need to create this CSS module

function ContactModal({ question, email, onQuestionChange, onEmailChange, onSend, onClose, messageSent }) {
  if (messageSent) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <p>Message Sent!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Contact Us</h2>
        <label htmlFor="question">Your Question:</label>
        <textarea
          id="question"
          value={question}
          onChange={onQuestionChange}
          rows="4"
          placeholder="Enter your question here" // Added placeholder
        />
        <label htmlFor="email">Your Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Your email address" // Added placeholder
        />
        <div className={styles.buttons}>
          <button onClick={onSend}>Send</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;