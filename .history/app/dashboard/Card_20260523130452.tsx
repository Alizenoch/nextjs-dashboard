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
    
  );
}
