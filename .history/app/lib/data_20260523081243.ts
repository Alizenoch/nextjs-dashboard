// app/lib/data.ts
import postgres from 'postgres';

// Connect to your Neon Postgres database
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

// --- Types ---
type Revenue = { date: string; total: number };
type LatestInvoice = {
  amount: number;
  name: string;
  image_url: string;
  email: string;
};

// Fetch revenue data
export async function fetchRevenue(): Promise<Revenue[]> {
  return sql<Revenue[]>`
    SELECT date, SUM(amount) AS total
    FROM invoices
    WHERE status = 'paid'
    GROUP BY date
    ORDER BY date ASC
  `;
}

// Fetch the latest 5 invoices
export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  return sql<LatestInvoice[]>`
    SELECT invoices.amount, customers.name, customers.image_url, customers.email
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5
  `;
}

// Fetch card data (counts and totals)
export async function fetchCardData() {
  const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
  const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
  const invoiceStatusPromise = sql`
    SELECT
      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    FROM invoices
  `;

  const [invoiceCount, customerCount, invoiceStatus] = await Promise.all([
    invoiceCountPromise,
    customerCountPromise,
    invoiceStatusPromise,
  ]);

  return {
    numberOfInvoices: Number(invoiceCount[0].count),
    numberOfCustomers: Number(customerCount[0].count),
    totalPaidInvoices: Number(invoiceStatus[0].paid),
    totalPendingInvoices: Number(invoiceStatus[0].pending),
  };
}
