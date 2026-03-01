export const CATEGORIES = [
  'Food',
  'Transport',
  'Health',
  'Entertainment',
  'Shopping',
  'Other',
];

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(dateString) {
  return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getCategoryColor(category) {
  const colors = {
    Food:          'bg-orange-100 text-orange-700',
    Transport:     'bg-blue-100 text-blue-700',
    Health:        'bg-green-100 text-green-700',
    Entertainment: 'bg-purple-100 text-purple-700',
    Shopping:      'bg-pink-100 text-pink-700',
    Other:         'bg-gray-100 text-gray-700',
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
}
