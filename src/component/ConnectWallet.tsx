'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import type { MetaMaskInpageProvider } from '@metamask/providers';
import styles from '../styles/connect.module.css'; // Import dengan nama styles

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const ConnectWallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask tidak ditemukan!');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();

      if (Number(network.chainId) !== 137) {
        alert('Harap pindah ke jaringan Polygon (Chain ID: 137)');
      } else {
        setWalletAddress(accounts[0]);
        localStorage.setItem('connectedWallet', accounts[0]);
      }
    } catch (error) {
      console.error('Gagal konek:', error);
    }
  };

  useEffect(() => {
    const checkPreviouslyConnected = async () => {
      const savedAddress = localStorage.getItem('connectedWallet');
      if (savedAddress && window.ethereum) {
        setWalletAddress(savedAddress);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        if (Number(network.chainId) !== 137) {
          alert('Harap pindah ke jaringan Polygon (Chain ID: 137)');
        }
      }
    };

    checkPreviouslyConnected();

    const handleAccountsChanged = (accounts: unknown) => {
      const acc = accounts as string[];
      if (acc.length > 0) {
        setWalletAddress(acc[0]);
        localStorage.setItem('connectedWallet', acc[0]);
      } else {
        setWalletAddress(null);
        localStorage.removeItem('connectedWallet');
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  return (
    <div className={styles.walletContainer}>
      <button onClick={connectWallet} className={styles.walletButton}>
        {walletAddress ? shortenAddress(walletAddress) : 'Connect • Polygon'}
      </button>
    </div>
  );
};

export default ConnectWallet;
