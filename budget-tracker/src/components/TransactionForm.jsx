import { useState } from "react";

export default function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  function handleSubmit(event) {
    event.preventDefault();

    if (description.trim() === "") {
      return;
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return;
    }
    const transaction = {
      id: Date.now(),
      description: description.trim(),
      amount: numericAmount,
      type: type,
    };
     onAdd(transaction);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2> Add Transaction</h2>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <label>
        Amount:
        <input
          type="number"
           name="amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>

      <label>
        Type:
        <select  name="type" value={type} onChange={(event) => setType(event.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <button type="submit">Add Transaction</button>
    </form>
  );
}
