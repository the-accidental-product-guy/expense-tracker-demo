import { NextResponse } from 'next/server';
import { getExpenses, addExpense } from '@/lib/storage';

export async function GET() {
  const expenses = getExpenses();
  return NextResponse.json(expenses);
}

export async function POST(request) {
  const body = await request.json();

  if (!body.description || !body.amount || !body.category || !body.date) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const expense = addExpense(body);
  return NextResponse.json(expense, { status: 201 });
}
