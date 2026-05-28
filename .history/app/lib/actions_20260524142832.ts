'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function createInvoice(formData: FormData) {
  const customer = formData.get('customer') as string;
  const amount = Number(formData.get('amount'));
  const status = formData.get('status') as string;
  const dueDate = formData.get('dueDate') as string;

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customer}, ${amount}, ${status}, ${dueDate})
  `;

  revalidatePath('/dashboard/invoices');
}
