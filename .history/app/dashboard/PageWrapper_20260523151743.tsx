"use client";

import { useState } from "react";
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
  cardData: { title: string; value: number }[];
}

export default function PageWrapper({
  revenue,
  latestInvoices,
  cardData,
}: PageWrapperProps) {
  const [currency, setCurrency] = useState<"USD" | "PGK">("USD");

  const transformedRevenue = revenue.map((r) => ({
    month: r.date,
    amount: r.total,
  }));

  return (
    <div className="space-y-6">
      {/* Currency toggle */}
      <div className="flex justify-end">
        <button
          onClick={() =>
            setCurrency((prev) => (prev === "USD" ? "PGK" : "USD"))
          }
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Switch to {currency === "USD" ? "PGK" : "USD"}
        </button>
      </div>

      {/* Cards + Chart side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cardData.map((card, idx) => (
            <Card
              key={idx}
              title={card.title}
              value={card.value}
              currency={currency}
            />
          ))}
        </div>

        {/* Chart */}
        <div className="h-64 bg-gray-900 p-4 rounded-lg shadow">
          <RevenueChart revenue={transformedRevenue} currency={currency} />
        </div>
      </div>

      {/* Latest Invoices */}
      <div className="bg-gray-900 p-4 rounded-lg shadow">
        <h2 className="text-white font-bold mb-4">Latest Invoices</h2>
        <ul className="space-y-2">
          {latestInvoices.map((invoice, idx) => (
            <li key={idx} className="text-gray-300">
              <strong>Customer:</strong> {invoice.customer} |{" "}
              <strong>Email:</strong> {invoice.email} |{" "}
              <strong>Amount:</strong>{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
                maximumFractionDigits: 0,
              }).format(invoice.amount)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
