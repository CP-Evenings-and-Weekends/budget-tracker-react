# Budget Tracker

Build a personal budget tracker that exercises everything from week 18: components, `useState`, props, conditional rendering, and lifting state up.

`App` holds a single piece of state — the array of transactions — and three sibling children read from it (`Summary`, `TransactionList`) or modify it (`TransactionForm`).  No child has its own `useState` for transactions.

## Setup

```bash
npm create vite@latest budget-tracker -- --template react
cd budget-tracker
npm install
npm run dev
```

Strip `src/App.jsx` down to `<h1>Budget Tracker</h1>` and start building from there.

## Data shape

Each transaction looks like this:

```js
{
  id: 1730000000000,         // a Date.now() or a counter is fine
  description: "Coffee",      // string
  amount: 4.50,               // number, always positive
  type: "expense"             // "income" | "expense"
}
```

The `amount` is **always stored positive**.  Whether it adds to or subtracts from the balance is determined by `type`.

## Requirements

### 1. `App` owns the state

```jsx
const [transactions, setTransactions] = useState([])
```

`App` renders three children and nothing else of substance:

- `<Summary transactions={transactions} />`
- `<TransactionList transactions={transactions} onDelete={...} />`
- `<TransactionForm onAdd={...} />`

Define `handleAdd` and `handleDelete` inside `App` and pass them down.  This is the same passive-children pattern from the lesson's third refactor.

### 2. `Summary` — derived values

`Summary` reads the transactions array via props and computes three numbers **inline** (no `useState`!):

- **Balance**: sum of income amounts minus sum of expense amounts
- **Total income**: sum of all `type === "income"` amounts
- **Total expenses**: sum of all `type === "expense"` amounts

Display each as a dollar amount, e.g. `Balance: $42.50`.  These numbers should always reflect the current `transactions` array — no need to update anything manually when transactions change, because React re-renders `Summary` with fresh props each time `App`'s state updates.

### 3. `TransactionList` — `.map` and click-to-delete

`.map` the transactions into a list (`<ul>`, `<table>`, your choice).  For each transaction, show description, amount, and an indication of income vs expense (color, prefix, badge — your call).

Each row needs a delete button.  Clicking it calls `onDelete(id)` (the prop `App` passed down), and `App`'s `handleDelete` filters that id out of the state.

Remember the `key` prop on each mapped item.

### 4. `TransactionForm` — controlled inputs

Three controlled inputs, each backed by their own piece of `useState` *inside `TransactionForm`*:

- `description` (text)
- `amount` (number)
- `type` (radio or select for `"income"` / `"expense"`)

On submit:
1. Validate that description is non-empty and amount is a positive number
2. Call `onAdd({ id: Date.now(), description, amount: Number(amount), type })`
3. Reset all three inputs

Form-internal state belongs to the form — it's not lifted.  Only the *committed* transaction needs to go up to `App`.

### 5. Empty state

When `transactions.length === 0`, show a friendly message in place of the list — *"No transactions yet. Add one below to get started."*

Watch the `&&`-with-`0` gotcha from Thursday's lesson: `{transactions.length && <X />}` will render the literal `0` on first load.

## You're done when

- Adding an income transaction increases the balance by that amount
- Adding an expense decreases the balance by that amount
- Deleting any transaction immediately updates all three numbers in `Summary` (no manual refresh, no flicker)
- Submitting the form clears all three inputs
- The empty state shows on first load and reappears if you delete everything
- No `useState` for transactions exists outside `App`
- Adding 50 transactions and deleting some at random still gives the correct balance

## Things to think about

- `Summary`'s three numbers are **derived** from `transactions`, not stored in their own state.  Why is that better than calling `setBalance(...)` whenever a transaction is added?  (Hint: think about what happens if you forget to update one of the three.)
- The `id` for each transaction comes from `Date.now()`.  What's the failure mode there?  (Hint: it's the same problem as Tuesday's list-rendering `key` discussion — what if a user adds two transactions in the same millisecond?)
- `TransactionForm` owns its three input states locally.  Could you have lifted them too?  Should you?  What's the rule of thumb?
- When you click delete, `App` re-renders, which re-renders every child.  Does `TransactionForm` need to re-render?  Why does React do it anyway?

## Stretch

- **Categories**: add a `category` field (Groceries, Rent, Salary, etc.) and a filter dropdown in `Summary` to show totals for a single category.
- **Sort the list** by date (newest first), amount (largest first), or alphabetical.
- **Edit a transaction** in place — clicking a row swaps the cells for editable inputs.
- **Persist to `localStorage`** so a page refresh restores the full list (preview of `useEffect`, next week).
- **Monthly view** — group transactions by month and let the user step through months with prev/next buttons.
- **Real-feel formatting**: `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })` for proper `$1,234.56` display.

> Stuck? Have a code error? Use the ["4 Before Me"](https://docs.google.com/document/d/1nseOs5oabYBKNHfwJZNAR7GlU0zkZxNagsw63AD7XV0/edit) debugging checklist to help you solve it!
