import { sql } from '@vercel/postgres';

export type DashboardData = {
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  totalCustomers: number;
};

export type Invoice = {
  id: string;
  customer: string;
  email?: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string; // normalized ISO string
};

export async function fetchCardData(): Promise<DashboardData> {
  const [totalInvoices, paidInvoices, pendingInvoices, totalCustomers] = await Promise.all([
    sql`SELECT COUNT(*) FROM invoices`,
    sql`SELECT COUNT(*) FROM invoices WHERE status = 'paid'`,
    sql`SELECT COUNT(*) FROM invoices WHERE status = 'pending'`,
    sql`SELECT COUNT(*) FROM customers`,
  ]);

  return {
    totalInvoices: Number(totalInvoices.rows[0].count),
    paidInvoices: Number(paidInvoices.rows[0].count),
    pendingInvoices: Number(pendingInvoices.rows[0].count),
    totalCustomers: Number(totalCustomers.rows[0].count),
  };
}

export async function fetchRevenue(): Promise<{ date: string; amount: number }[]> {
  const result = await sql`
    SELECT date, amount 
    FROM invoices 
    WHERE status = 'paid' 
    ORDER BY date ASC
  `;
  return result.rows.map(r => ({
    date: new Date(r.date).toISOString(), // normalized
    amount: Number(r.amount),
  }));
}

export async function fetchInvoiceById(id: string): Promise<Invoice | null> {
  const result = await sql`
    SELECT i.id, c.name AS customer, c.email, i.amount, i.status, i.date
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    WHERE i.id = ${id}
    LIMIT 1;
  `;
  const r = result.rows[0];
  return r
    ? {
        id: String(r.id),
        customer: r.customer ?? '',
        email: r.email ?? '',
        amount: Number(r.amount),
        status: r.status as 'pending' | 'paid',
        date: new Date(r.date).toISOString(),
      }
    : null;
}

export async function fetchInvoices(search?: string): Promise<Invoice[]> {
  const result = search
    ? await sql`
        SELECT i.id, c.name AS customer, c.email, i.amount, i.status, i.date
        FROM invoices i
        JOIN customers c ON i.customer_id = c.id
        WHERE c.name ILIKE ${'%' + search + '%'}
           OR i.status ILIKE ${'%' + search + '%'}
        ORDER BY i.date DESC;
      `
    : await sql`
        SELECT i.id, c.name AS customer, c.email, i.amount, i.status, i.date
        FROM invoices i
        JOIN customers c ON i.customer_id = c.id
        ORDER BY i.date DESC;
      `;

  return result.rows.map(r => ({
    id: String(r.id),
    customer: r.customer ?? '',
    email: r.email ?? '',
    amount: Number(r.amount),
    status: r.status as 'pending' | 'paid',
    date: new Date(r.date).toISOString(), // normalized
  }));
}
