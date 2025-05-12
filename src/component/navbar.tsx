'use client';
import Link from 'next/link';
import { useState } from 'react';
import ConnectWallet from './ConnectWallet'; // Import ConnectWallet component
import styles from '@/styles/Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">🔮 RoxyFi</Link>
      </div>

      {/* Hamburger Icon */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {/* Nav Links */}
      <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={toggleMenu}>✕</button>

        <Link href="/">Home</Link>
        <Link href="/pools">Staking</Link>
        <Link href="/">NFT</Link>
        <Link href="/">Farms</Link>
        <Link href="/swap">Swap</Link>
        <Link href="/">Add Liquidity</Link>

        {/* Connect Wallet button in the Navbar */}
        <div className={styles.connectButton}>
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
