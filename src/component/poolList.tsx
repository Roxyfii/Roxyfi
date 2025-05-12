import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import styles from "@/styles/PoolList.module.css";
import Image from "next/image";
import Abi from "../data/Abi.json";

type Pool = {
  id: number;
  name: string;
  amount: number;
  apr: number;
  status: string;
  logo: string;
  userStake: number;
  rewardToken: number;
  contractAddress: string;
  claimableReward?: number;
};

interface PoolListProps {
  pools: Pool[];
}

const PoolList: React.FC<PoolListProps> = ({ pools }) => {
  const [stakeAmounts, setStakeAmounts] = useState<{ [key: number]: number }>({});
  const [userStakes, setUserStakes] = useState<{ [key: number]: string }>({});
  const [claimableRewards, setClaimableRewards] = useState<{ [key: number]: string }>({});
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const getContract = useCallback((address: string): ethers.Contract => {
    if (!signer) throw new Error("Wallet not connected");
    return new ethers.Contract(address, Abi, signer);
  }, [signer]);

  useEffect(() => {
    const init = async () => {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const ethProvider = new ethers.BrowserProvider((window as any).ethereum);
        try {
          const walletSigner = await ethProvider.getSigner();
          setSigner(walletSigner);
        } catch (error) {
          console.error("Gagal mendapatkan signer:", error);
        }
      }
    };

    init();
  }, []);

  const fetchUserStakingData = useCallback(async (pool: Pool) => {
    if (!signer) return;

    try {
      const contract = getContract(pool.contractAddress);
      const address = await signer.getAddress();

      const userStake = await contract.getStakedAmount(address);
      const userStakeInDecimal = parseFloat(ethers.formatUnits(userStake, 18));
      const userStakeFormatted = new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(userStakeInDecimal);

      setUserStakes((prev) => ({
        ...prev,
        [pool.id]: userStakeFormatted,
      }));

      const reward = await contract.getClaimableReward(address);
      const rewardInDecimal = parseFloat(ethers.formatUnits(reward, 0));
      const rewardFormatted = new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(rewardInDecimal);

      setClaimableRewards((prev) => ({
        ...prev,
        [pool.id]: rewardFormatted,
      }));
    } catch (err) {
      console.error(`Error fetching staking data for pool ${pool.id}:`, err instanceof Error ? err.message : err);
    }
  }, [signer, getContract]);

  // 🔁 Polling data setiap 10 detik
  useEffect(() => {
    if (!signer || pools.length === 0) return;

    const interval = setInterval(() => {
      pools.forEach((pool) => fetchUserStakingData(pool));
    }, 10000);

    return () => clearInterval(interval);
  }, [signer, pools, fetchUserStakingData]);

  const handleStake = async (pool: Pool) => {
    const amount = stakeAmounts[pool.id];
    if (isNaN(amount) || amount <= 0 || !signer) return;

    try {
      const contract = getContract(pool.contractAddress);
      const amountInWei = ethers.parseUnits(amount.toString(), 18);

      const tx = await contract.stake(amountInWei);
      await tx.wait();

      alert(`Staked ${amount} in pool ${pool.name} successfully!`);
      fetchUserStakingData(pool);
    } catch (err) {
      console.error("Stake error:", err);
      alert("Stake failed: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  const handleUnstake = async (pool: Pool) => {
    const amount = stakeAmounts[pool.id];
    if (!amount || amount <= 0 || !signer) return;

    try {
      const contract = getContract(pool.contractAddress);
      const amountInWei = ethers.parseUnits(amount.toString(), 18);

      const tx = await contract.unstake(amountInWei);
      await tx.wait();
      fetchUserStakingData(pool);
    } catch (err) {
      console.error("Unstake error:", err);
    }
  };

  const handleHarvest = async (pool: Pool) => {
    if (!signer) return;

    try {
      const contract = getContract(pool.contractAddress);
      const tx = await contract.claimReward();
      await tx.wait();
      fetchUserStakingData(pool);
    } catch (err) {
      console.error("Harvest error:", err);
    }
  };

  return (
    <div className={styles.poolContainer}>
      {pools.map((pool) => (
        <div key={pool.id} className={styles.poolCard}>
          <div className={styles.poolHeader}>
            <Image
              src={`/images/${pool.logo}`}
              alt={pool.name}
              className={styles.poolLogo}
              width={100}
              height={100}
            />

            <div className={styles.poolInfo}>
              <h2 className={styles.poolName}>{pool.name}</h2>
              <span className={`${styles.status} ${styles[pool.status]}`}>{pool.status}</span>
            </div>
          </div>

          <div className={styles.poolDetails}>
            <p><strong>Total Staked:</strong> {pool.amount}</p>
            <p><strong>APR:</strong> {pool.apr}%</p>
            <p><strong>Your Stake:</strong> {userStakes[pool.id] ?? "0"}</p>
          </div>

          <div className={styles.rewardInfo}>
            <p><strong>IDRX EARN:</strong> {claimableRewards[pool.id] ?? "0"}</p>
          </div>

          <div className={styles.inputSection}>
            <input
              type="number"
              placeholder="Enter amount"
              value={stakeAmounts[pool.id] || ""}
              onChange={(e) => setStakeAmounts((prev) => ({
                ...prev,
                [pool.id]: parseFloat(e.target.value) || 0
              }))}
            />
          </div>

          <div className={styles.stakeButtons}>
          <button
             onClick={() => handleStake(pool)}
             className={`${styles.stakeButton} ${pool.status === 'inactive' ? styles.inactiveButton : ''} `}
             disabled={pool.status === 'inactive'}>
             Stake
          </button>

          <button
  onClick={() => handleUnstake(pool)}
  className={`${styles.unstakeButton} ${pool.status === 'inactive' ? styles.inactiveButton : ''}`}
  disabled={pool.status === 'inactive'}
>
  Unstake
</button>

<button
  onClick={() => handleHarvest(pool)}
  className={`${styles.harvestButton} ${pool.status === 'inactive' ? styles.inactiveButton : ''}`}
  disabled={pool.status === 'inactive'}
>
  Harvest
</button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default PoolList;
