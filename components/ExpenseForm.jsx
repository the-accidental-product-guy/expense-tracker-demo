'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/lib/utils';

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;

    setLoading(true);
    await onAdd(form);
    setForm({
      description: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
    });
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-40">
          <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
          <input
            type="text"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="e.g. Coffee, Groceries..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="w-28">
          <label className="block text-xs font-medium text-gray-600 mb-1">Amount ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            placeholder="0.00"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="w-36">
          <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="w-36">
          <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
}
