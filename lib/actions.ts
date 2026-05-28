'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// --- Types ---
export type InvoiceCreate = {
  customer: string;
  amount: number;
  status: 'pending' | 'paid';
  dueDate: string; // ISO date string
};

export type InvoiceUpdate = InvoiceCreate;

// --- Validation schema ---
const invoiceSchema = z.object({
  customer: z.string().min(1, 'Customer name is required'),
  amount: z.number().positive('Amount must be greater than 0'),
  status: z.enum(['pending', 'paid']),
  dueDate: z.string().min(1, 'Due date is required'),
});

// --- Create ---
export async function createInvoice(data: InvoiceCreate) {
  const result = invoiceSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (
        (SELECT id FROM customers WHERE name = ${data.customer} LIMIT 1),
        ${data.amount},
        ${data.status},
        ${data.dueDate}
      )
    `;
    revalidatePath('/invoices'); // ✅ match your invoices page
    return { errors: {} };
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw new Error('Failed to create invoice');
  }
}

// --- Update ---
export async function updateInvoice(id: string, data: InvoiceUpdate) {
  const result = invoiceSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

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
    revalidatePath('/invoices');
    return { errors: {} };
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
    revalidatePath('/invoices');
    return { errors: {} };
  } catch (error) {
    console.error('Error deleting invoice:', error);
    throw new Error('Failed to delete invoice');
  }
}
