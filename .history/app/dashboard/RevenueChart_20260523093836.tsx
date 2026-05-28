// app/dashboard/RevenueChart.tsx
interface RevenueChartProps {
  revenue: { date: string; total: number }[];
  currency?: "USD" | "PGK"; // ✅ add this
}

export default function RevenueChart({ revenue, currency = "USD" }: RevenueChartProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">Recent Revenue</h2>
      <div className="mt-4 h-48 bg-gray-100 flex items-end gap-2 p-2">
        {revenue.map((item, idx) => (
          <div
            key={idx}
            className="w-8 bg-blue-500"
            style={{ height: `${item.total / 100}px` }} // scale for demo
            title={`${item.date}: ${new Intl.NumberFormat("en-US", {
              style: "currency",
              currency,
            }).format(item.total)}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
