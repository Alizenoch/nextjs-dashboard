// app/dashboard/components/PageWrapper.tsx
"use client";

import { useState } from "react";
import Card from "./Card";
import { Lusitana } from "next/font/google";
import { ReactNode } from "react";

interface PageWrapperProps {
  cardData: { title: string; value: number }[];
  lusitana: ReturnType<typeof Lusitana>;
  children: ReactNode; // chart + invoices passed in from page.tsx
}

export default function PageWrapper({
  cardData,
  lusitana,
  children,
}: PageWrapperProps) {
  const [currency, setCurrency] = useState<"USD" | "PGK">("USD");

  return (
    <div className="space-y-8">
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

      {/* Top row: summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cardData.map((c, idx) => (
          <Card
            key={idx}
            title={c.title}
            value={c.value}
            currency={currency}
            lusitana={lusitana}
          />
        ))}
      </div>

      {/* Middle row: chart + invoices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}
