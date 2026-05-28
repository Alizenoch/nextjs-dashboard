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
  const revenue = revenueResult.rows.map((row) => ({
    date: String(row.date),
    total: Number(row.total),
  }));

  // Latest invoices query
  const latestInvoicesResult = await sql`
    SELECT c.name AS customer, c.email, i.amount, i.date, i.status
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    ORDER BY i.date DESC
    LIMIT 3;
  `;
  const latestInvoices = latestInvoicesResult.rows.map((row) => ({
    customer: String(row.customer),
    email: String(row.email),
    amount: Number(row.amount),
    date: String(row.date),
    status: String(row.status),
  }));

  // Card totals
  const collectedResult = await sql`
    SELECT COALESCE(SUM(amount),0) AS collected FROM invoices WHERE status = 'paid';
  `;
  const pendingResult = await sql`
    SELECT COALESCE(SUM(amount),0) AS pending FROM invoices WHERE status = 'pending';
  `;
  const invoiceCountResult = await sql`
    SELECT COUNT(*)::int AS count FROM invoices;
  `;
  const customerCountResult = await sql`
    SELECT COUNT(*)::int AS count FROM customers;
  `;

  // ✅ Always build cardData as an array
  const cardData: { title: string; value: number }[] = [
    { title: "Collected", value: Number(collectedResult.rows[0]?.collected ?? 0) },
    { title: "Pending", value: Number(pendingResult.rows[0]?.pending ?? 0) },
    { title: "Invoices", value: Number(invoiceCountResult.rows[0]?.count ?? 0) },
    { title: "Customers", value: Number(customerCountResult.rows[0]?.count ?? 0) },
  ];

  // Debug check (optional)
  console.log("cardData:", cardData);
  console.log("cardData runtime:", cardData, Array.isArray(cardData));


  return (
    <PageWrapper
      revenue={revenue}
      latestInvoices={latestInvoices}
      cardData={cardData}
    />
  );
}
