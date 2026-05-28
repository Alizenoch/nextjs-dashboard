// app/dashboard/Card.tsx
import { lusitana } from "@/app/ui/fonts";

interface CardProps {
  title: string;
  value: number | string;
  type: "collected" | "pending" | "invoices" | "customers";
}

export default function Card({ title, value }: CardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className={`${lusitana.className} text-sm font-semibold text-gray-600`}>
        {title}
      </h2>
      <p className="mt-2 text-2xl font-bold text-gray-900">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );
}
