import DebtItem from "./DebtItem";

export default function DebtList({ debts, onDelete }) {
  return (
    <section>
      <h2 className="list-title">Debt</h2>
      {debts.length === 0 ? (
        <p className="empty">No debts added yet.</p>
      ) : (
        <ul className="debt-list">
          {debts.map((debt) => (
            <DebtItem key={debt.id} debt={debt} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </section>
  );
}