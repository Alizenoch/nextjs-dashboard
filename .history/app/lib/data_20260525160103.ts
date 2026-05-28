// app/lib/data.ts

console.log("POSTGRES_URL:", process.env.POSTGRES_URL);



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
    SELECT i.id, c.name AS customer, c.email, i.amount, i.status, i.date
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    WHERE i.id = ${id}
    LIMIT 1;
  `;
  return result.rows[0] || null;
}

export async function fetchInvoices(search?: string): Promise<Invoice[]> {
  let result;
  if (search) {
    result = await sql`
      SELECT i.id, c.name AS customer, c.email, i.amount, i.status, i.date
      FROM invoices i
      JOIN customers c ON i.customer_id = c.id
      WHERE c.name ILIKE ${'%' + search + '%'}
         OR i.status ILIKE ${'%' + search + '%'}
      ORDER BY i.date DESC;
    `;
  } else {
    result = await sql`
      SELECT i.id, c.name AS customer, c.email, i.amount, i.status, i.date
      FROM invoices i
      JOIN customers c ON i.customer_id = c.id
      ORDER BY i.date DESC;
    `;
  }

  return result.rows.map(r => ({
    id: String(r.id),
    customer: String(r.customer),
    email: String(r.email),
    amount: Number(r.amount),
    status: r.status as 'pending' | 'paid',
    date: String(r.date),
  }));
}
