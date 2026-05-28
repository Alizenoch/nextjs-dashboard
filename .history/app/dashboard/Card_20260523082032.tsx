"use client";

import Image from "next/image";
import { Lusitana } from "next/font/google";
import { useState } from "react";
import Card from "@/app/dashboard/Card";
import RevenueChart from "@/app/dashboard/RevenueChart";
import LatestInvoices from "@/app/dashboard/Latest-invoices";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";

const lusitana = Lusitana({ subsets: ["latin"], weight: ["400", "700"] });

export default function PageWrapper() {
  const [currency, setCurrency] = useState<"USD" | "PGK">("USD");

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

      <Dashboard currency={currency} />
    </main>
  );
}

// Async server component for data fetching
async function Dashboard({ currency }: { currency: "USD" | "PGK" }) {
  const [revenue, latestInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = cardData;

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-100 dark:bg-gray-900 p-4">
        <nav className="flex flex-col gap-4">
          <a href="#" className="text-lg font-semibold">Home</a>
          <a href="#" className="text-lg font-semibold">Invoices</a>
          <a href="#" className="text-lg font-semibold">Customers</a>
          <a href="#" className="text-lg font-semibold text-red-600">Sign Out</a>
        </nav>
      </aside>

      <section className="flex-1 p-6">
        <h1 className={`${lusitana.className} text-2xl font-bold`}>
          Dashboard
        </h1>

        {/* Cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Collected" value={totalPaidInvoices} type="collected" currency={currency} />
          <Card title="Pending" value={totalPendingInvoices} type="pending" currency={currency} />
          <Card title="Invoices" value={numberOfInvoices} type="invoices" />
          <Card title="Customers" value={numberOfCustomers} type="customers" />
        </div>

        {/* Revenue Chart + Latest Invoices */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <RevenueChart revenue={revenue} />
          <LatestInvoices latestInvoices={latestInvoices} />
        </div>
      </section>
    </div>
  );
}
