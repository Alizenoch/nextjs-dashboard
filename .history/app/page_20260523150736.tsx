import { sql } from "@vercel/postgres";
import PageWrapper from "./dashboard/PageWrapper";

export default async function Page() {
  // Revenue by month
  const revenue = await sql`
    SELECT DATE_TRUNC('month', date) AS date, SUM(amount) AS total
    FROM invoices
    GROUP BY date
    ORDER BY date ASC;
  `;

  // Latest invoices
  const latestInvoices = await sql`
    SELECT customer_id, amount, status, date
    FROM invoices
    ORDER BY date DESC
    LIMIT 3;
  `;

  // Totals for cards
  const collectedResult = await sql`
    SELECT SUM(amount) AS collected FROM invoices WHERE status = 'paid';
  `;
  const pendingResult = await sql`
    SELECT SUM(amount) AS pending FROM invoices WHERE status = 'pending';
  `;
  const invoiceCount = await sql`
    SELECT COUNT(*) AS count FROM invoices;
  `;
  const customerCount = await sql`
    SELECT COUNT(*) AS count FROM customers;
  `;

  // Build cardData array
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
