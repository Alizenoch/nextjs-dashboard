"use client";

interface CardProps {
  title: string;
  value: number;
  currency?: "USD" | "PGK";
}

export default function Card({ title, value, currency = "USD" }: CardProps) {
  // Pick a background color based on the card title
  const colorMap: Record<string, string> = {
    Collected: "bg-green-700",
    Pending: "bg-amber-600",
    Invoices: "bg-blue-700",
    Customers: "bg-purple-700",
  };

  const bgColor = colorMap[title] || "bg-gray-900";

  const formattedValue =
    title === "Invoices" || title === "Customers"
      ? value.toString()
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
          maximumFractionDigits: 0,
        }).format(value);

  return (
    <div className={`${bgColor} p-4 rounded-lg shadow`}>
      <h3 className="text-gray-200">{title}</h3>
      <p className="text-white text-xl font-bold">{formattedValue}</p>
    </div>
  );
}
