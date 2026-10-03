export default function TransactionList({ transactions, onDelete }) {
  return (
    <div className="white">
      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet. Add one below to get started.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.description} | {" "}
              {transaction.type === "income" ? "+" : "-"}${transaction.amount}
              {" | "}
              {transaction.type}
              <button onClick={() => onDelete(transaction.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
