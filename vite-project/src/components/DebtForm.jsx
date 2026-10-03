import { useState } from "react";

export default function DebtForm({ onAdd }) {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [apr, setApr] = useState("");
  const [minPayment, setMinPayment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    const balanceNum = Number(balance);
    const aprNum = Number(apr);
    const paymentNum = Number(minPayment);

    // name required, balance and payment must be positive, APR can be 0
    if (!trimmed || !(balanceNum > 0) || !(paymentNum > 0) || aprNum < 0)
      return;

    onAdd({
      id: crypto.randomUUID(),
      name: trimmed,
      startingBalance: balanceNum,
      balance: balanceNum,
      apr: aprNum,
      minPayment: paymentNum,
    });

    setName("");
    setBalance("");
    setApr("");
    setMinPayment("");
  }

  return (
    <form className="tx-form" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Debt name (e.g. Visa)"
      />
      <input
        type="number"
        min="0"
        step="0.01"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        placeholder="Balance"
      />
      <input
        type="number"
        min="0"
        step="0.01"
        value={apr}
        onChange={(e) => setApr(e.target.value)}
        placeholder="APR %"
      />
      <input
        type="number"
        min="0"
        step="0.01"
        value={minPayment}
        onChange={(e) => setMinPayment(e.target.value)}
        placeholder="Monthly payment"
      />
      <button type="submit">Add debt</button>
    </form>
  );
}