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
            backgroundColor: "rgba(59, 130, 246, 0.8)", // clearer blue with opacity
            borderColor: "#3b82f6",
            borderWidth: 1,
            borderRadius: 4,   // rounded bar tops
            barPercentage: 0.6 // wider bars
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 2,
        plugins: {
          legend: {
            labels: {
              color: "#ffffff", // legend text color
              font: { size: 14 },
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#ffffff", font: { size: 12 } },
            grid: { color: "#374151" }, // subtle grid
          },
          y: {
            ticks: {
              color: "#ffffff",
              font: { size: 12 },
              // ✅ Format values as currency
              callback: (value: number | string) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency,
                }).format(Number(value)),
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
