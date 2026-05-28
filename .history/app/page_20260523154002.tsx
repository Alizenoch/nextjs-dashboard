import { sql } from "@vercel/postgres";
import PageWrapper from "./dashboard/PageWrapper";

export default async function Page() {
  // Revenue query
  const revenueResult = await sql`
    SELECT DATE_TRUNC('month', date) AS date, SUM(amount) AS total
    FROM invoices
    GROUP BY date
    ORDER BY date ASC;
  `;
  const revenue: { date: string; total: number }[] = revenueResult.rows as {
    date: string;
    total: number;
  }[];

  // Latest invoices query
  const latestInvoicesResult = await sql`
    SELECT c.name AS customer, c.email, i.amount, i.date, i.status
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    ORDER BY i.date DESC
    LIMIT 3;
  `;
  const latestInvoices: {
    customer: string;
    email: string;
    amount: number;
    date: string;
    status: string;
  }[] = latestInvoicesResult.rows as {
    customer: string;
    email: string;
    amount: number;
    date: string;
    status: string;
  }[];

  // Card totals
  const collectedResult = await sql`
    SELECT SUM(amount) AS collected FROM invoices WHERE status = 'paid';
  `;
  const pendingResult = await sql`
    SELECT SUM(amount) AS pending FROM invoices WHERE status = 'pending';
  `;
  const invoiceCountResult = await sql`
    SELECT COUNT(*) AS count FROM invoices;
  `;
  const customerCountResult = await sql`
    SELECT COUNT(*) AS count FROM customers;
  `;

  const cardData = [
    { title: "Collected", value: Number(collectedResult.rows[0].collected) || 0 },
    { title: "Pending", value: Number(pendingResult.rows[0].pending) || 0 },
    { title: "Invoices", value: Number(invoiceCountResult.rows[0].count) || 0 },
    { title: "Customers", value: Number(customerCountResult.rows[0].count) || 0 },
  ];

  return (
    <PageWrapper
      revenue={revenue}
      latestInvoices={latestInvoices}
      cardData={cardData}
    />
  );
}
