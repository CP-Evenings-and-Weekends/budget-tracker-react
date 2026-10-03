export default function Summary({ transactions }) {
  const totalIncome = transactions.reduce((total, transaction) => {
    return transaction.type === "income" ? total + transaction.amount : total;
  }, 0);

  const totalExpenses = transactions.reduce((total, transaction) => {
    return transaction.type === "expense" ? total + transaction.amount : total;
  }, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary-style">
      <h2>Summary</h2>
    <p><strong>Total Income:</strong> ${totalIncome.toFixed(2)}</p>
    <p><strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}</p>
    <p><strong>Remaining Balance:</strong> ${balance.toFixed(2)}</p>
    </div>
  );
}
