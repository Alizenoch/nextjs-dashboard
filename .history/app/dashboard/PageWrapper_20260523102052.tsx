// app/dashboard/PageWrapper.tsx
"use client";

import { useState } from "react";
import Card from "./Card";
import RevenueChart from "./RevenueChart";
import LatestInvoices from "./LatestInvoices";

interface PageWrapperProps {
  revenue: { date: string; total: number }[];
  latestInvoices: {
    amount: number;
    name: string;
    image_url: string;
    email: string;
  }[];
  cardData: {
    numberOfInvoices: number;
    numberOfCustomers: number;
    totalPaidInvoices: number;
    totalPendingInvoices: number;
  };
  lusitana: { className: string };   // ✅ expects lusitana
}

export default function PageWrapper({ revenue, latestInvoices, cardData, lusitana }: PageWrapperProps) {
  const [currency, setCurrency] = useState<"USD" | "PGK">("USD");

  const { numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices } = cardData;

  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* Currency Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setCurrency(currency === "USD" ? "PGK" : "USD")}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Switch to {currency === "USD" ? "PGK" : "USD"}
        </button>
      </div>

      <section className="flex-1 p-6">
        <h1 className={`${lusitana.className} text-2xl font-bold`}>Dashboard</h1>

        {/* Cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Collected" value={totalPaidInvoices} type="collected" currency={currency} />
          <Card title="Pending" value={totalPendingInvoices} type="pending" currency={currency} />
          <Card title="Invoices" value={numberOfInvoices} type="invoices" />
          <Card title="Customers" value={numberOfCustomers} type="customers" />
        </div>

        {/* Revenue Chart + Latest Invoices */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <RevenueChart revenue={revenue} currency={currency} />
          <LatestInvoices latestInvoices={latestInvoices} currency={currency} />
        </div>
      </section>
    </main>
  );
}

