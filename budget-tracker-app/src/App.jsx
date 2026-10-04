import { useState } from "react";
import Summary from "./components/Summary";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";

export default function App() {
  // The ONE piece of shared state: the list of transactions.
  // All three children depend on it, so it lives in their common parent.
  const [transactions, setTransactions] = useState([]);

  // Called by TransactionForm with a finished transaction.
  // Builds a NEW array (old items + the new one) so React detects the change.
  function handleAdd(newTransaction) {
    setTransactions((previousTransactions) => [...previousTransactions, newTransaction]);
  }

  // Called by TransactionList with the id of the row clicked.
  // .filter returns a NEW array with every transaction except that one.
  function handleDelete(transactionId) {
    setTransactions((previousTransactions) =>
      previousTransactions.filter((transaction) => transaction.id !== transactionId),
    );
  }

  return (
    <>
      <h1>Budget Tracker</h1>
      {/* Reads transactions to calculate totals */}
      <Summary transactions={transactions} />
      {/* Reads transactions to show rows; reports deletes up */}
      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
      />
      {/* Reports new transactions up; doesn't need to read the list */}
      <TransactionForm onAdd={handleAdd} />
    </>
  );
}
