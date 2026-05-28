"use client";

import { useState } from "react";
import RevenueChart from "./components/RevenueChart";
import Card from "./components/Card";

interface Invoice {
  customer: string;
  email: string;
  amount: number;
  date: string;
  status: string;
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
        <ul className="divide-y divide-gray-700">
          {latestInvoices.map((invoice, idx) => (
            <li
              key={idx}
              className="py-2 flex justify-between items-center text-gray-300"
            >
              {/* Left side: customer info */}
              <div>
                <p className="font-semibold">{invoice.customer}</p>
                <p className="text-sm">{invoice.email}</p>
              </div>

              {/* Right side: amount + status */}
              <div className="text-right">
                <p className="text-blue-400 font-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency,
                    maximumFractionDigits: 0,
                  }).format(invoice.amount)}
                </p>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs ${
                    invoice.status === "paid"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {invoice.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
