import { NextResponse } from 'next/server';
import { deleteExpense } from '@/lib/storage';

export async function DELETE(request, { params }) {
  const { id } = await params;
  const deleted = deleteExpense(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
