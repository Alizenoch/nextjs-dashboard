"use client";

interface CardProps {
  title: string;
  value: number; // keep numeric for consistency
  currency?: "USD" | "PGK"; // optional, defaults to USD
}

export default function Card({ title, value, currency = "USD" }: CardProps) {
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow">
      <h3 className="text-gray-400">{title}</h3>
      <p className="text-white text-xl font-bold">{formattedValue}</p>
    </div>
  );
}
