export default function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <section className="summary">
      <p className="balance">Balance: ${balance.toFixed(2)}</p>
      <p>Total income: ${income.toFixed(2)}</p>
      <p>Total expenses: ${expenses.toFixed(2)}</p>
    </section>
  );
}
