import React from 'react';
import styles from './ContactModal.module.css';

function ContactModal({ onClose, messageSent }) {
  if (messageSent) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <p>Message Sent!</p>
          <button onClick={onClose}>Close</button> {/* Keep close button for consistency */}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Contact Us</h2>
        <p>Please email us at:</p>
        <p>
          <a href="mailto:info@askthewitch.com">info@askthewitch.com</a>
        </p>
        <p>We will respond as soon as we can.</p>
        <div className={styles.buttons}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;