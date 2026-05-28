"use client";

import { useState } from "react";
import Card from "./Card";
import { Lusitana } from "next/font/google";
import { ReactNode } from "react";
import type { CardData } from "../../lib/data";   // ✅ reuse the exported type

interface PageWrapperProps {
  cardData: CardData;
  lusitana: ReturnType<typeof Lusitana>;
  children: ReactNode;
}

export default function PageWrapper({ cardData, lusitana, children }: PageWrapperProps) {
  const [currency, setCurrency] = useState<"USD" | "PGK">("USD");

  const { numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices } = cardData;

  return (
    <div className="space-y-8">
      {/* Currency toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setCurrency((prev) => (prev === "USD" ? "PGK" : "USD"))}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Switch to {currency === "USD" ? "PGK" : "USD"}
        </button>
      </div>

      {/* Top row: summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Collected" value={totalPaidInvoices} currency={currency} lusitana={lusitana} />
        <Card title="Pending" value={totalPendingInvoices} currency={currency} lusitana={lusitana} />
        <Card title="Invoices" value={numberOfInvoices} currency={currency} lusitana={lusitana} />
        <Card title="Customers" value={numberOfCustomers} currency={currency} lusitana={lusitana} />
      </div>

      {/* Middle row: chart + invoices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}
