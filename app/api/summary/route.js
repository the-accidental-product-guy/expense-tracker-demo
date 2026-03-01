import { NextResponse } from 'next/server';

// Exercise 3: Implement this endpoint.
//
// It should return spending totals grouped by category.
// Expected response shape:
//
//   {
//     byCategory: { Food: 193.0, Health: 78.75, ... },
//     total: 365.73,
//     count: 8
//   }
//
// Hint: import getExpenses from '@/lib/storage'

export async function GET() {
  return NextResponse.json(
    { error: 'Not implemented yet' },
    { status: 501 }
  );
}
