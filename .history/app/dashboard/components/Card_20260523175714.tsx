// app/dashboard/components/Card.tsx
interface CardProps {
  title: string;
  value: number;
  currency: "USD" | "PGK";
  lusitana: any; // or ReturnType<typeof Lusitana>
}

export default function Card({ title, value, currency, lusitana }: CardProps) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className={`${lusitana.className} text-sm text-gray-500`}>{title}</h2>
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
