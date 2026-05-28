import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// --- Types ---
export type Revenue = { date: string; total: number };
export type LatestInvoice = {
  id: number;
  customer: string;
  email: string;
  amount: number;
  status: string;
  date: string;
};
export interface CardData {
  numberOfInvoices: number;
  numberOfCustomers: number;
  totalPaidInvoices: number;
  totalPendingInvoices: number;
}

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
    SELECT invoices.id,
           invoices.amount,
           invoices.status,
           invoices.date AS date,
           customers.name AS customer,
           customers.email
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5;
  `;
}

// Fetch card data (counts and totals)
export async function fetchCardData(): Promise<CardData> {
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

// Fetch a single invoice by ID
export async function fetchInvoiceById(id: string): Promise<LatestInvoice | null> {
  const result = await sql<LatestInvoice[]>`
    SELECT invoices.id,
           invoices.amount,
           invoices.status,
           invoices.date AS date,
           customers.name AS customer,
           customers.email
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.id = ${id}
    LIMIT 1;
  `;

  return result.length > 0 ? result[0] : null;
}
