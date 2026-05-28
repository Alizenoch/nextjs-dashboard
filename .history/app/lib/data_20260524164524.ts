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
