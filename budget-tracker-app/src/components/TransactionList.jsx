// Display-only: shows the transactions and reports delete clicks up to App.
export default function TransactionList({ transactions, onDelete }) {
  // Empty state, using an early return instead of &&.
  // This avoids the &&-with-0 gotcha: {transactions.length && ...}
  // would put a literal "0" on the page when the list is empty.
  if (transactions.length === 0) {
    return <p>No transactions yet. Add one below to get started.</p>;
  }

  return (
    <ul>
      {/* One <li> per transaction. key = the transaction's unique id. */}
      {transactions.map((transaction) => (
        <li
          key={transaction.id}
          // Color shows income (green) vs expense (red).
          // style takes a JavaScript object, hence the double braces:
          // outer {} = "JavaScript here", inner {} = the object.
          style={{ color: transaction.type === "income" ? "green" : "red" }}
        >
          {transaction.description}{" "}
          {/* Ternary picks the prefix; toFixed(2) always shows two decimals */}
          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}{" "}
          {/* Arrow function so delete runs on click, with THIS row's id */}
          <button onClick={() => onDelete(transaction.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
