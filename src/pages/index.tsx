'use client';

import styles from '@/styles/LandingPage.module.css';

import Navbar from '../component/navbar';


export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar/>
    
      <div className={styles.content}>
        <h2 className={styles.title}>Selamat Datang di RoxyFi</h2>
        <p className={styles.subtitle}>
          Platform DeFi untuk staking, farming, dan swapping token di jaringan Polygon.
        </p>

       
      </div>
    </div>
  );
}
