import React from 'react';
import styles from './ContactModal.module.css';

function ContactModal({ onClose, messageSent }) {
  if (messageSent) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <p>Message Sent!</p>
          <div className={styles.buttons}>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Contact Us</h2>
        <p>Please email us at:</p>
        <div className={styles.emailContainer}>
          <a href="mailto:info@askthewitch.com" className={styles.emailLink}>
            info@askthewitch.com
          </a>
        </div>
        <p>We will respond as soon as we can.</p>
        <div className={styles.buttons}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;