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
            backgroundColor: "rgba(59, 130, 246, 0.85)", // blue bars
            borderColor: "#3b82f6",
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.6,
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
              color: "#0f172a", // dark text for legend
              font: { size: 14, weight: "bold" },
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#0f172a", font: { size: 13, weight: "bold" } },
            grid: { color: "#e5e7eb" }, // light gray grid
          },
          y: {
            ticks: {
              color: "#0f172a",
              font: { size: 13, weight: "bold" },
              callback: (value: number | string) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency,
                }).format(Number(value)),
            },
            grid: { color: "#e5e7eb" },
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
    <div className="rounded-lg bg-white p-6 shadow-md border border-gray-100 md:col-span-2 lg:col-span-4">
      <h2 className="text-sm font-medium text-gray-600">Recent Revenue</h2>
      <div className="mt-4 h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
