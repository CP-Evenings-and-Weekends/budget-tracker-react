import { monthsToPayoff } from "../utilities/payoff";

export default function DebtItem({ debt, onDelete }) {
  const { id, name, startingBalance, balance, apr, minPayment } = debt;

  const paidPercent = Math.round(
    ((startingBalance - balance) / startingBalance) * 100,
  );
  const months = monthsToPayoff(balance, apr, minPayment);

  return (
    <li className="debt-item">
      <div className="debt-top">
        <strong>{name}</strong>
        <span>
          ${balance.toFixed(2)} left · {apr}% APR
        </span>
      </div>

      <div className="progress">
        <div className="progress-fill" style={{ width: `${paidPercent}%` }} />
      </div>
      <small>{paidPercent}% paid off</small>

      {balance <= 0 ? (
        <p className="debt-note">Paid off! 🎉</p>
      ) : months === Infinity ? (
        <p className="debt-warning">
          The minimum payment doesn't cover the interest.
        </p>
      ) : (
        <p className="debt-note">
          About {months} month{months === 1 ? "" : "s"} to go at ${minPayment}
          /mo
        </p>
      )}

      <button className="delete-btn" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
}
