// app/dashboard/RevenueChart.tsx
'use client';

interface RevenueChartProps {
  revenue: { date: string; total: number }[];
}

export default function RevenueChart({ revenue }: RevenueChartProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">Recent Revenue</h2>
      <div className="mt-4 flex h-48 items-end gap-2 p-2 bg-gray-100">
        {revenue.map((item) => (
          <div
            key={item.date}
            className="flex flex-col items-center justify-end"
          >
            <div
              className="w-8 bg-blue-500"
              style={{ height: `${item.total / 100}px` }}
            ></div>
            <span className="text-xs mt-1">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
