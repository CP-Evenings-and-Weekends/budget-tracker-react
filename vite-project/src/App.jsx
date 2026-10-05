import { useState } from "react";
import Summary from "./components/Summary";
import DebtForm from "./components/DebtForm";
import DebtList from "./components/DebtList";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [debts, setDebts] = useState([]);
  const income = transactions.filter((t) => t.type === "income");
  const expenses = transactions.filter((t) => t.type === "expense");

  function handleAdd(transaction) {
    setTransactions((prev) => [...prev, transaction]);
  }

  function handleDelete(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  function handleDeleteDebt(id) {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }

  function handleAddDebt(debt) {
    setDebts((prev) => [...prev, debt]);
  }

  return (
    <>
      <h1 className="page-title">Budget Tracker</h1>
      <Summary transactions={transactions} />

      <TransactionList
        title="Income"
        transactions={income}
        onDelete={handleDelete}
        emptyMessage="No income yet."
      />
      <TransactionForm type="income" onAdd={handleAdd} />

      <TransactionList
        title="Expenses"
        transactions={expenses}
        onDelete={handleDelete}
        emptyMessage="No expenses yet."
      />
      <TransactionForm type="expense" onAdd={handleAdd} />

      <DebtList debts={debts} onDelete={handleDeleteDebt} />
      <DebtForm onAdd={handleAddDebt} />
    </>
  );
}