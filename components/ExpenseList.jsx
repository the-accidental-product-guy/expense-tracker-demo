'use client';

import { useState } from 'react';
import { CATEGORIES, formatCurrency, formatDate, getCategoryColor } from '@/lib/utils';

export default function ExpenseList({ expenses, onDelete }) {
  const [filter, setFilter] = useState('All');
  const [deleting, setDeleting] = useState(null);

  const filtered = filter === 'All'
    ? expenses
    : expenses.filter(e => e.category === filter);

  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  const handleDelete = async (id) => {
    setDeleting(id);
    await onDelete(id);
    setDeleting(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Expenses{' '}
          <span className="text-sm font-normal text-gray-400">({filtered.length})</span>
        </h2>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {sorted.length === 0 ? (
        <div className="py-16 text-center text-gray-400">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-sm">No expenses found</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {sorted.map(expense => (
            <div
              key={expense.id}
              className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{expense.description}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(expense.date)}</p>
              </div>

              <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${getCategoryColor(expense.category)}`}>
                {expense.category}
              </span>

              <span className="text-sm font-semibold text-gray-900 w-20 text-right shrink-0">
                {formatCurrency(expense.amount)}
              </span>

              <button
                onClick={() => handleDelete(expense.id)}
                disabled={deleting === expense.id}
                className="text-gray-300 hover:text-red-400 transition-colors disabled:opacity-50 text-lg leading-none"
                title="Delete"
              >
                {deleting === expense.id ? '…' : '×'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50 rounded-b-xl">
        <span className="text-sm font-medium text-gray-500">Total</span>
        <span className="text-lg font-bold text-gray-900">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
