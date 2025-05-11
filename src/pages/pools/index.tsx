// src/pages/index.tsx
import { useEffect, useState } from "react";
import PoolList from "../../component/poolList";
import poolsData from "../../data/pools.json";
import styles from "@/styles/PoolList.module.css";
import ConnectWallet from '../../component/ConnectWallet';

export default function Home() {
  const [pools, setPools] = useState(poolsData);

  useEffect(() => {
    // Simulasi fetch data
    setPools(poolsData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      <div className={styles.bungkus}>
      
      <div className={styles.judul}>
      <h1 >🔮 ROXYFI STAKE APP</h1>
      </div>
      <div className={styles.connet} >
      <ConnectWallet/>
      </div>
      </div>
      
      <PoolList pools={pools} />
    </div>
  );
}
