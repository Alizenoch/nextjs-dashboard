'use server';

import { sql } from '@vercel/postgres';

export async function updateInvoice(formData: FormData) {
  const id = formData.get('id');
  const customer = formData.get('customer');
  const amount = formData.get('amount');
  const status = formData.get('status');
  const dueDate = formData.get('dueDate');

  try {
    await sql`
      UPDATE invoices
      SET customer_id = (SELECT id FROM customers WHERE name = ${customer} LIMIT 1),
          amount = ${amount},
          status = ${status},
          date = ${dueDate}
      WHERE id = ${id};
    `;
  } catch (error) {
    console.error('Error updating invoice:', error);
    throw new Error('Failed to update invoice');
  }
}
