'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

// --- Types ---
export type InvoiceCreate = {
  customer: string;
  amount: number;
  status: 'pending' | 'paid';
  dueDate: string; // ISO date string
};

export type InvoiceUpdate = {
  customer: string;
  amount: number;
  status: 'pending' | 'paid';
  dueDate: string; // ISO date string
};

// --- Create ---
export async function createInvoice(data: InvoiceCreate) {
  try {
    const result = await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (
        (SELECT id FROM customers WHERE name = ${data.customer} LIMIT 1),
        ${data.amount},
        ${data.status},
        ${data.dueDate}
      )
      RETURNING id;
    `;
    revalidatePath('/dashboard/invoices');
    return { success: true, id: result.rows[0].id };
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw new Error('Failed to create invoice');
  }
}

// --- Update ---
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
    revalidatePath('/dashboard/invoices');
    return { success: true };
  } catch (error) {
    console.error('Error updating invoice:', error);
    throw new Error('Failed to update invoice');
  }
}

// --- Delete ---
export async function deleteInvoice(id: string) {
  try {
    await sql`
      DELETE FROM invoices WHERE id = ${id};
    `;
    revalidatePath('/dashboard/invoices');
    return { success: true };
  } catch (error) {
    console.error('Error deleting invoice:', error);
    throw new Error('Failed to delete invoice');
  }
}
