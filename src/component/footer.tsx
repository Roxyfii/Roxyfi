'use client';
import styles from '@/styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2025 RoxyFi. All Rights Reserved.</p>
      <p>
        Built with ❤️ by{' '}
        <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
          RoxyTeam
        </a>
      </p>
    </footer>
  );
};

export default Footer;
