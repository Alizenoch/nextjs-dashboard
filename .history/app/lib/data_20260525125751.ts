// app/lib/data.ts
import { sql } from '@vercel/postgres';

export type DashboardData = {
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  totalCustomers: number;
};

// ✅ New Invoice type
export type Invoice = {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'paid';   // restrict to union
  date: string;
};

export async function fetchCardData(): Promise<DashboardData> {
  const totalInvoices = (await sql`SELECT COUNT(*) FROM invoices`).rows[0].count;
  const paidInvoices = (await sql`SELECT COUNT(*) FROM invoices WHERE status = 'paid'`).rows[0].count;
  const pendingInvoices = (await sql`SELECT COUNT(*) FROM invoices WHERE status = 'pending'`).rows[0].count;
  const totalCustomers = (await sql`SELECT COUNT(*) FROM customers`).rows[0].count;

  return {
    totalInvoices: Number(totalInvoices),
    paidInvoices: Number(paidInvoices),
    pendingInvoices: Number(pendingInvoices),
    totalCustomers: Number(totalCustomers),
  };
}

export async function fetchRevenue() {
  const result = await sql`SELECT date, amount FROM invoices WHERE status = 'paid' ORDER BY date ASC`;
  return result.rows.map(r => ({
    date: new Date(r.date),
    amount: Number(r.amount),
  }));
}

export async function fetchInvoiceById(id: string) {
  const result = await sql`
    SELECT id, customer, amount, status, date
    FROM invoices
    WHERE id = ${id}
    LIMIT 1;
  `;
  return result.rows[0] || null;
}

// ✅ Updated: supports optional search
export async function fetchInvoices(search?: string): Promise<Invoice[]> {
  let result;
  if (search) {
    result = await sql`
      SELECT id, customer, amount, status, date
      FROM invoices
      WHERE customer ILIKE ${'%' + search + '%'}
         OR status ILIKE ${'%' + search + '%'}
      ORDER BY date DESC;
    `;
  } else {
    result = await sql`
      SELECT id, customer, amount, status, date
      FROM invoices
      ORDER BY date DESC;
    `;
  }

  return result.rows.map(r => ({
    id: String(r.id),
    customer: String(r.customer),
    amount: Number(r.amount),
    status: r.status as 'pending' | 'paid', // 👈 cast here
    date: String(r.date),
  }));
}
