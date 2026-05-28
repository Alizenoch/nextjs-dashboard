// app/dashboard/components/Card.tsx
"use client";

import { Lusitana } from "next/font/google";

interface CardProps {
  title: string;
  value: number;
  currency: "USD" | "PGK";
  lusitana: ReturnType<typeof Lusitana>;
}

export default function Card({ title, value, currency, lusitana }: CardProps) {
  // Format the value with currency
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(value);

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className={`${lusitana.className} text-sm font-medium text-gray-500`}>
        {title}
      </h3>
      <p className="mt-2 text-xl font-bold text-gray-900">{formattedValue}</p>
    </div>
  );
}
