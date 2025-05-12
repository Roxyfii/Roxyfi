import { useState } from 'react';
import styles from '../styles/swap.module.css';
import swapTokens from '../data/swap.json';

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
}

export default function SwapPage() {
  const [fromToken, setFromToken] = useState<Token>(swapTokens[0]);
  const [toToken, setToToken] = useState<Token>(swapTokens[1]);
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const handleSwap = () => {
    console.log(`Swapping ${amount} ${fromToken.symbol} to ${toToken.symbol} with slippage ${slippage}%`);
  };

  const renderTokenOption = (token: Token) => (
    <option key={token.symbol} value={token.symbol}>
      {token.symbol}
    </option>
  );

  return (
    <div className={styles.swapContainer}>
      <h2 className={styles.title}>Token Swap</h2>
      <div className={styles.card}>
        <img
          src="/images/digi.gif"
          alt="Decoration"
          className={styles.floatingImage}
        />

        <div className={styles.inputGroup}>
          <label>From:</label>
          <div className={styles.tokenSelector}>
            <img
              src={`/tokens/${fromToken.symbol}.png`}
              alt={fromToken.symbol}
              className={styles.tokenLogo}
            />
            <select
              value={fromToken.symbol}
              onChange={(e) =>
                setFromToken(swapTokens.find(t => t.symbol === e.target.value)!)
              }
            >
              {swapTokens.map(renderTokenOption)}
            </select>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>To:</label>
          <div className={styles.tokenSelector}>
            <img
              src={`/tokens/${toToken.symbol}.png`}
              alt={toToken.symbol}
              className={styles.tokenLogo}
            />
            <select
              value={toToken.symbol}
              onChange={(e) =>
                setToToken(swapTokens.find(t => t.symbol === e.target.value)!)
              }
            >
              {swapTokens.map(renderTokenOption)}
            </select>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Slippage Tolerance:</label>
          <div className={styles.slippageOptions}>
            {['0.1', '0.5', '1'].map((val) => (
              <button
                key={val}
                className={`${styles.slippageButton} ${slippage === val ? styles.active : ''}`}
                onClick={() => setSlippage(val)}
              >
                {val}%
              </button>
            ))}
            <input
              type="number"
              min="0"
              max="50"
              step="0.1"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              className={styles.slippageInput}
            />
            <span className={styles.slippageUnit}>%</span>
          </div>
        </div>

        <button className={styles.swapButton} onClick={handleSwap}>
          Swap
        </button>
      </div>
    </div>
  );
}
