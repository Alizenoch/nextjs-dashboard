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

export async function updateInvoice(id: string, formData: FormData) {
  const customer = formData.get('customer') as string;
  const amount = Number(formData.get('amount'));
  const status = formData.get('status') as string;
  const dueDate = formData.get('dueDate') as string;

  await sql`
    UPDATE invoices
    SET customer_id = ${customer}, amount = ${amount}, status = ${status}, date = ${dueDate}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`
    DELETE FROM invoices WHERE id = ${id}
  `;
  revalidatePath('/dashboard/invoices');
}

import { sql } from '@vercel/postgres';

// Define a type for clarity
export type InvoiceUpdate = {
  customer: string;
  amount: number;
  status: 'pending' | 'paid';
  dueDate: string; // ISO date string
};

export async function updateInvoice(id: string, data: InvoiceUpdate) {
  try {
    await sql`
      UPDATE invoices
      SET amount = ${data.amount},
          status = ${data.status},
          date = ${data.dueDate},
          customer_id = (
            SELECT id FROM customers WHERE name = ${data.customer} LIMIT 1
          )
      WHERE id = ${id};
    `;
    return { success: true };
  } catch (error) {
    console.error('Error updating invoice:', error);
    throw new Error('Failed to update invoice');
  }
}
