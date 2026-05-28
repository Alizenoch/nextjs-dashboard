// app/dashboard/RevenueChart.tsx
"use client";

import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js";

interface RevenueChartProps {
  revenue: { date: string; total: number }[];
  currency: "USD" | "PGK";
}

export default function RevenueChart({ revenue, currency }: RevenueChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chartConfig: ChartConfiguration = {
      type: "bar",
      data: {
        labels: revenue.map((r) => r.date),
        datasets: [
          {
            label: "Revenue",
            data: revenue.map((r) => r.total),
            backgroundColor: "#3b82f6", // Tailwind blue-500
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 2,
        scales: {
          x: {
            ticks: { color: "#f9f9f9" },
            grid: { color: "#374151" }, // gray-700
          },
          y: {
            ticks: {
              color: "#f9f9f9",
              // ✅ Explicitly type value to fix TS error
              callback: (value: number | string) =>
                currency === "USD" ? `$${value}` : `K${value}`,
            },
            grid: { color: "#374151" },
          },
        },
      },
    };

    const chart = new Chart(ctx, chartConfig);

    return () => {
      chart.destroy();
    };
  }, [revenue, currency]);

  return (
    <div className="rounded-lg bg-gray-900 p-6 shadow-md md:col-span-2 lg:col-span-4">
      <h2 className="text-sm font-medium text-gray-400">Recent Revenue</h2>
      <div className="mt-4 h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
