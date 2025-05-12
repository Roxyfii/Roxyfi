'use client';

import Image from 'next/image';
import styles from '@/styles/herosection.module.css';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY * 0.2);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.textContent}>
        <h1 className={styles.heading}>Selamat Datang di Dunia Galaxy Cyborg</h1>
        <p className={styles.subheading}>
          Jelajahi dimensi baru bersama teknologi alien dan kekuatan masa depan.
        </p>
      </div>
      <div
        className={styles.imageContainer}
        style={{ transform: `translateY(${offsetY}px)` }}
      >
        <Image
          src="/images/roxyfi.png" // ganti sesuai gambar kamu
          alt="Galaxy Cyborg"
          width={200}
          height={200}
          className={styles.image}
        />
      </div>
    </section>
  );
}
