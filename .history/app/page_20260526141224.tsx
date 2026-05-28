// app/page.tsx

import { sql } from "@vercel/postgres";
import { Lusitana } from "next/font/google";
import PageWrapper from "./dashboard/components/PageWrapper";
import RevenueChart from "./dashboard/components/RevenueChart";
import LatestInvoices from "./dashboard/LatestInvoices";

const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", "700"] });

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
    SELECT i.id, c.name AS customer, c.email, i.amount, i.date, i.status
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    ORDER BY i.date DESC
    LIMIT 3;
  `;
  const latestInvoices = latestInvoicesResult.rows.map((row) => ({
    id: Number(row.id),
    customer: String(row.customer),
    email: String(row.email),
    amount: Number(row.amount),
    date: String(row.date),
    status: String(row.status),
  }));

  // Card totals (object style)
  const collectedResult = await sql`
    SELECT COALESCE(SUM(amount),0)::int AS collected FROM invoices WHERE status = 'paid';
  `;
  const pendingResult = await sql`
    SELECT COALESCE(SUM(amount),0)::int AS pending FROM invoices WHERE status = 'pending';
  `;
  const invoiceCountResult = await sql`
    SELECT COUNT(*)::int AS count FROM invoices;
  `;
  const customerCountResult = await sql`
    SELECT COUNT(*)::int AS count FROM customers;
  `;

  const cardData = {
    totalPaidInvoices: collectedResult.rows[0]?.collected ?? 0,
    totalPendingInvoices: pendingResult.rows[0]?.pending ?? 0,
    numberOfInvoices: invoiceCountResult.rows[0]?.count ?? 0,
    numberOfCustomers: customerCountResult.rows[0]?.count ?? 0,
  };

  // Transform revenue for chart
  const transformedRevenue = revenue.map((r) => ({
    month: r.date,
    amount: r.total,
  }));

  return (
    <PageWrapper cardData={cardData} lusitana={lusitana}>
      <div className="h-64 bg-gray-900 p-4 rounded-lg shadow">
        <RevenueChart revenue={transformedRevenue} currency="USD" />
      </div>
      <LatestInvoices latestInvoices={latestInvoices} currency="USD" />
    </PageWrapper>
  );
}
