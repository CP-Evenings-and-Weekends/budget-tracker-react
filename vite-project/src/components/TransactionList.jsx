export default function TransactionList({
  title,
  transactions,
  onDelete,
  emptyMessage,
}) {
  return (
    <section>
      <h2 className="list-title">{title}</h2>
      {transactions.length === 0 ? (
        <p className="empty">{emptyMessage}</p>
      ) : (
        <ul className="tx-list">
          {transactions.map((t) => (
            <li key={t.id} className={t.type}>
              <span>
                {t.description}: {t.type === "income" ? "+" : "-"}$
                {t.amount.toFixed(2)}
              </span>
              <button className="delete-btn" onClick={() => onDelete(t.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}