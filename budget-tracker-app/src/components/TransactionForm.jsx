import { useState } from "react";

export default function TransactionForm({ onAdd }) {
  // Form-local state: what's currently typed or selected.
  // It stays here, not in App, because nothing else needs half-typed values.
  // Only the finished transaction goes up to App.
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(""); // input values are always strings
  const [type, setType] = useState("expense");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    // Stop the browser from reloading the page on form submit.
    event.preventDefault();

    const trimmedDescription = description.trim();
    // Convert the string from the input to a real number.
    // Number('') is 0 and Number('abc') is NaN; both fail the > 0 check below.
    const numericAmount = Number(amount);

    // Validation: description required, amount must be a positive number.
    if (trimmedDescription === "" || !(numericAmount > 0)) {
      setErrorMessage("Enter a description and an amount greater than 0.");
      return; // stop here; nothing is added
    }

    // Send the finished transaction up to App.
    // Date.now() = milliseconds since 1970, used as a simple unique id.
    onAdd({
      id: Date.now(),
      description: trimmedDescription,
      amount: numericAmount,
      type: type,
    });

    // Reset all inputs by resetting the state they display.
    setDescription("");
    setAmount("");
    setType("expense");
    setErrorMessage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      {/* Controlled inputs: value comes from state, onChange updates state */}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        min="0"
        step="0.01" // allows cents
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />

      <select
        value={type}
        onChange={(event) => setType(event.target.value)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button type="submit">Add</button>

      {/* Show the error only when there is one */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
}
