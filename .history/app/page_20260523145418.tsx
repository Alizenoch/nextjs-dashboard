import PageWrapper from "./dashboard/PageWrapper";
import { sql } from "@vercel/postgres"; // or your db client

export default async function Page() {
  // Fetch revenue data (example: invoices table)
  const revenue = await sql`
    SELECT DATE_TRUNC('month', date) AS date, SUM(amount) AS total
    FROM invoices
    GROUP BY date
    ORDER BY date ASC;
  `;

  // Fetch latest invoices
  const latestInvoices = await sql`
    SELECT customer, email, amount, date, total
    FROM invoices
    ORDER BY date DESC
    LIMIT 3;
  `;

  // Calculate collected and pending totals
  const collectedResult = await sql`
    SELECT SUM(amount) AS collected
    FROM invoices
    WHERE status = 'paid';
  `;

  const pendingResult = await sql`
    SELECT SUM(amount) AS pending
    FROM invoices
    WHERE status = 'pending';
  `;

  // Count invoices and customers
  const invoiceCount = await sql`SELECT COUNT(*) AS count FROM invoices;`;
  const customerCount = await sql`SELECT COUNT(*) AS count FROM customers;`;

  // Build cardData array from DB results
  const cardData = [
    { title: "Collected", value: Number(collectedResult.rows[0].collected) || 0 },
    { title: "Pending", value: Number(pendingResult.rows[0].pending) || 0 },
    { title: "Invoices", value: Number(invoiceCount.rows[0].count) || 0 },
    { title: "Customers", value: Number(customerCount.rows[0].count) || 0 },
  ];

  return (
    <PageWrapper
      revenue={revenue.rows}
      latestInvoices={latestInvoices.rows}
      cardData={cardData}
    />
  );
}
