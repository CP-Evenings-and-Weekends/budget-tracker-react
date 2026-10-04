// Formats a number as US currency: 42.5 -> "$42.50", -5 -> "-$5.00", 1234.5 -> "$1,234.50"
const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

// Display-only: receives the transactions and CALCULATES the totals.
// No useState here. The numbers are derived on every render,
// so they always match the transactions array automatically.
export default function Summary({ transactions }) {
  // .filter keeps only income transactions.
  // .reduce walks the array, adding each amount to a running total.
  //   runningTotal starts at 0 (the second argument),
  //   and each pass returns runningTotal + this transaction's amount.
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((runningTotal, transaction) => runningTotal + transaction.amount, 0);

  // Same calculation for expenses.
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((runningTotal, transaction) => runningTotal + transaction.amount, 0);

  // Amounts are stored positive; the type decides add vs subtract.
  const balance = totalIncome - totalExpenses;

  return (
    <section>
      <h2>Summary</h2>
      <p>Balance: {currencyFormatter.format(balance)}</p>
      <p>Total income: {currencyFormatter.format(totalIncome)}</p>
      <p>Total expenses: {currencyFormatter.format(totalExpenses)}</p>
    </section>
  );
}
