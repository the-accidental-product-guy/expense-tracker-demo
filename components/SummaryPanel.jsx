'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';

export default function SummaryPanel() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/summary')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          setSummary(data);
        }
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <span className="text-amber-500 text-lg">⚠️</span>
        <div>
          <p className="text-amber-800 text-sm font-medium">Summary unavailable</p>
          <p className="text-amber-600 text-xs mt-0.5">
            The <code className="font-mono">/api/summary</code> endpoint needs to be implemented.
          </p>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-20 mb-3"></div>
            <div className="h-7 bg-gray-200 rounded w-28"></div>
          </div>
        ))}
      </div>
    );
  }

  const topCategory = Object.entries(summary.byCategory)
    .sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-blue-600 text-white rounded-xl p-5">
        <p className="text-blue-200 text-xs font-medium uppercase tracking-wide">Total Spent</p>
        <p className="text-2xl font-bold mt-1">{formatCurrency(summary.total)}</p>
        <p className="text-blue-200 text-xs mt-2">{summary.count} expenses</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Top Category</p>
        <p className="text-xl font-bold text-gray-900 mt-1">{topCategory?.[0] ?? '—'}</p>
        <p className="text-gray-400 text-xs mt-2">
          {topCategory ? formatCurrency(topCategory[1]) : ''}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Categories</p>
        <p className="text-xl font-bold text-gray-900 mt-1">
          {Object.keys(summary.byCategory).length}
        </p>
        <p className="text-gray-400 text-xs mt-2">active</p>
      </div>
    </div>
  );
}
