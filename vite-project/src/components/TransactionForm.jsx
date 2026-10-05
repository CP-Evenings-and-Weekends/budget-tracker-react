import { useState } from "react";

export default function TransactionForm({ type, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = description.trim();
    const number = Number(amount);
    if (!trimmed || !(number > 0)) return;

    onAdd({
      id: crypto.randomUUID(),
      description: trimmed,
      amount: number,
      type,
    });

    setDescription("");
    setAmount("");
  }

  return (
    <form className="tx-form" onSubmit={handleSubmit}>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={`${type === "income" ? "Income" : "Expense"} description`}
      />
      <input
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button type="submit">Add {type}</button>
    </form>
  );
}
