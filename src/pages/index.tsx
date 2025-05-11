'use client';

import styles from '@/styles/LandingPage.module.css';

import Footer from '../component/footer';
import Navbar from '../component/navbar';
import Utility from '@/component/utility';


export default function Home() {
  return (
    <div className={styles.container}>
      
      <Navbar/>
      <Footer/>
      <div className={styles.content}>
        <h2 className={styles.title}>Selamat Datang di RoxyFi</h2>
        <p className={styles.subtitle}>
        adalah platform terdesentralisasi yang menyediakan SDK dan smart contract siap pakai untuk mempermudah integrasi blockchain ke dalam aplikasi web3. Kami mempercepat pengembangan dengan solusi yang aman, fleksibel, dan mudah diimplementasikan.
        </p>  
      </div>
      <Utility/>
      
    </div>
  );
}
