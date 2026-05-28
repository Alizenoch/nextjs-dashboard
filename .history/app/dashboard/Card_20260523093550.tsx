// app/dashboard/Card.tsx
import { lusitana } from "@/app/ui/fonts";

interface CardProps {
  title: string;
  value: number | string;
  type: "collected" | "pending" | "invoices" | "customers";
  currency?: "USD" | "PGK";
}

export default function Card({ title, value, type, currency = "USD" }: CardProps) {
  const typeColors: Record<CardProps["type"], string> = {
    collected: "text-green-600",
    pending: "text-yellow-600",
    invoices: "text-blue-600",
    customers: "text-purple-600",
  };

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className={`${lusitana.className} text-sm font-semibold text-gray-600`}>
        {title}
      </h2>
      <p className={`mt-2 text-2xl font-bold ${typeColors[type]}`}>
        {typeof value === "number"
          ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value)
          : value}
      </p>
    </div>
  );
}
