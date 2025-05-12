'use client';
import styles from '@/styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.section}>
          <h4>Navigation</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#staking">Staking</a></li>
            <li><a href="#nfts">NFTs</a></li>
            <li><a href="#docs">Docs</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Contact</h4>
          <ul>
            <li>Email: <a href="mailto:contact@roxyfi.com">contact@roxyfi.com</a></li>
            <li>Telegram: <a href="https://t.me/roxyfi" target="_blank" rel="noopener noreferrer">@roxyfi</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Social</h4>
          <ul>
            <li><a href="https://twitter.com/roxyfi" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://github.com/roxyfi" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://discord.gg/roxyfi" target="_blank" rel="noopener noreferrer">Discord</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomNote}>
        <p>© 2025 RoxyFi. All Rights Reserved.</p>
        <p>
          Built with ❤️ by{' '}
          <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
            RoxyTeam
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
