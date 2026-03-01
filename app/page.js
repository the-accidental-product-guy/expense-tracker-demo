'use client';

import { useState, useEffect, useCallback } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import SummaryPanel from '@/components/SummaryPanel';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = useCallback(async () => {
    const res = await fetch('/api/expenses');
    const data = await res.json();
    setExpenses(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAdd = async (expense) => {
    await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
    fetchExpenses();
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
          <p className="text-blue-100 text-sm mt-0.5">Track your daily spending</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <SummaryPanel />
        <ExpenseForm onAdd={handleAdd} />
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
            <p>Loading expenses...</p>
          </div>
        ) : (
          <ExpenseList expenses={expenses} onDelete={handleDelete} />
        )}
      </div>
    </main>
  );
}
