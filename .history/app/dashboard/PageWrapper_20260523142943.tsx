"use client";

import RevenueChart from "./RevenueChart";
import Card from "./Card";

interface Invoice {
  customer: string;
  email: string;
  amount: number;
  date: string;
  total: number;
}

interface PageWrapperProps {
  revenue: { date: string; total: number }[];
  latestInvoices: Invoice[];
  cardData: { title: string; value: string }[];
}

export default function PageWrapper({
  revenue,
  latestInvoices,
  cardData,
}: PageWrapperProps) {
  // Transform { date, total } into { month, amount }
  const transformedRevenue = revenue.map((r) => ({
    month: r.date,
    amount: r.total,
  }));

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cardData.map((card, idx) => (
          <Card key={idx} title={card.title} value={card.value} />
        ))}
      </div>

      {/* Revenue Chart */}
      <RevenueChart revenue={transformedRevenue} currency="USD" />

      {/* Latest Invoices */}
      <div className="bg-gray-900 p-4 rounded-lg shadow">
        <h2 className="text-white font-bold mb-4">Latest Invoices</h2>
        <ul className="space-y-2">
          {latestInvoices.map((invoice, idx) => (
            <li key={idx} className="text-gray-300">
              <strong>Customer:</strong> {invoice.customer} |{" "}
              <strong>Email:</strong> {invoice.email} |{" "}
              <strong>Amount:</strong> ${invoice.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
