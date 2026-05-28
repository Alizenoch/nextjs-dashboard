// app/dashboard/components/Card.tsx
import { Lusitana } from "next/font/google";

interface CardProps {
  title: string;
  value: number;
  currency: "USD" | "PGK";
  lusitana: ReturnType<typeof Lusitana>;
}

export default function Card({ title, value, currency, lusitana }: CardProps) {
  return (
    <div className="p-4 bg-white rounded shadow">
      {/* Title styled with Lusitana font */}
      <h2 className={`${lusitana.className} text-sm text-gray-500`}>
        {title}
      </h2>

      {/* Value formatted with currency */}
      <p className="text-xl font-bold">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
          maximumFractionDigits: 0,
        }).format(value)}
      </p>
    </div>
  );
}
