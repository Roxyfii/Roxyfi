// components/AddPool.tsx
import { useState } from "react";

const AddPool = ({ addPool }: { addPool: (name: string, amount: number) => void }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/addPool", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount }),
    });

    if (response.ok) {
      const newPool = await response.json();
      addPool(newPool.name, newPool.amount); // Update frontend state
      setName("");
      setAmount(0);
    }
  };

  return (
    <div>
      <h2>Add Pool</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pool Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </label>
        <br />
        <button type="submit">Add Pool</button>
      </form>
    </div>
  );
};

export default AddPool;
