// In-memory expense storage.
// Data resets on server restart — for production, replace with a real database.

let nextId = 9;

let expenses = [
  { id: 1, description: 'Weekly groceries',      amount: '85.50', category: 'Food',          date: '2026-02-22' },
  { id: 2, description: 'Uber to airport',        amount: '42.00', category: 'Transport',     date: '2026-02-23' },
  { id: 3, description: 'Netflix subscription',   amount: '15.99', category: 'Entertainment', date: '2026-02-24' },
  { id: 4, description: 'Coffee and croissant',   amount: '12.50', category: 'Food',          date: '2026-02-25' },
  { id: 5, description: 'Gym membership',         amount: '50.00', category: 'Health',        date: '2026-02-26' },
  { id: 6, description: 'Team lunch',             amount: '95.00', category: 'Food',          date: '2026-02-27' },
  { id: 7, description: 'Book: Clean Code',       amount: '35.99', category: 'Shopping',      date: '2026-02-28' },
  { id: 8, description: 'Pharmacy',               amount: '28.75', category: 'Health',        date: '2026-03-01' },
];

export function getExpenses() {
  return [...expenses];
}

export function addExpense({ description, amount, category, date }) {
  const newExpense = {
    id: nextId++,
    description,
    amount,
    category,
    date,
  };
  expenses.push(newExpense);
  return newExpense;
}

export function deleteExpense(id) {
  const lengthBefore = expenses.length;
  expenses = expenses.filter(e => e.id !== id);
  return expenses.length < lengthBefore;
}
