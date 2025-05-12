// src/pages/index.tsx
import { useEffect, useState } from "react";
import PoolList from "../../component/poolList";
import poolsData from "../../data/pools.json";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";
import styles from '@/styles/layer2.module.css'

export default function Home() {
  const [pools, setPools] = useState(poolsData);

  useEffect(() => {
    // Simulasi fetch data
    setPools(poolsData);
  }, []);

  return (
    <div className={styles.layer2}>
      <Navbar/>
      <PoolList pools={pools} />
      <div>
      <img
            src="/images/wizard.png" // ganti sesuai lokasi file
            alt="Utility Contract Flow"
            width={100}
            height={100}
            className="w-full h-auto"
          />
      </div>
      <Footer/>
      
    </div>
  );
}
