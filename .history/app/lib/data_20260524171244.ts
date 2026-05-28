// app/lib/data.ts
import { sql } from '@vercel/postgres';

export type DashboardData = {
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  totalCustomers: number;
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

// ✅ New function for the list page
export async function fetchInvoices() {
  const result = await sql`
    SELECT id, customer, amount, status, date
    FROM invoices
    ORDER BY date DESC;
  `;
  return result.rows.map(r => ({
    id: String(r.id),
    customer: String(r.customer),
    amount: Number(r.amount),
    status: String(r.status),
    date: String(r.date),
  }));
}
