import { useState } from 'react'
import Summary from "./components/Summary";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";

import './App.css'

function App() {
  const [transactions, setTransactions] = useState([]);

function handleDelete(id) {
  setTransactions((prev) =>
  prev.filter((transaction) => transaction.id !== id)
  );
}

function handleAdd(transaction) {
  setTransactions((prev) => [...prev, transaction]
  );
}

  return (
    <div>
    <h1>Budget Tracker</h1>
     
      <Summary transactions={transactions} />
    
      <TransactionList transactions={transactions} onDelete={handleDelete}/>
      <TransactionForm  onAdd={handleAdd}/> 
    </div>
  )
}

export default App
