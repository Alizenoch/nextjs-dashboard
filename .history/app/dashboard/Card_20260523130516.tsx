// app/dashboard/Card.tsx
"use client";

interface CardProps {
  title: string;
  value: number;
  type: "collected" | "pending" | "invoices" | "customers";
  currency?: "USD" | "PGK";
}

export default function Card({ title, value, type, currency }: CardProps) {
  // Format values depending on type
  const formattedValue =
    type === "collected" || type === "pending"
      ? currency === "USD"
        ? `$${value.toLocaleString()}`
        : `K${value.toLocaleString()}`
      : value.toLocaleString();

  return (
    <div className="rounded-lg bg-white p-6 shadow-md border border-gray-100">
    <h2 className="text-sm font-medium text-gray-600">{title}</h2>
  <p className="mt-2 text-2xl font-bold text-gray-900">{formattedValue}</p>
</div>

  );
}
