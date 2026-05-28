"use client";

import React, { useEffect, useRef } from "react";
import {
  Chart,
  ChartConfiguration,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);

interface RevenueChartProps {
  revenue: { month: string; amount: number }[];
  currency: "USD" | "PGK";
}

export default function RevenueChart({ revenue, currency }: RevenueChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const chartConfig: ChartConfiguration = {
      type: "bar",
      data: {
        labels: revenue.map((r) =>
  new Date(r.month).toLocaleString("en-US", { month: "short", year: "numeric" })
),

        datasets: [
          {
            label: "Revenue",
            data: revenue.map((r) => r.amount),
            backgroundColor: "rgba(59, 130, 246, 0.8)",
            borderColor: "#3b82f6",
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: "#ffffff", font: { weight: "bold" } },
          },
          title: {
            display: true,
            text: "Monthly Revenue",
            color: "#ffffff",
            font: { size: 16, weight: "bold" },
          },
        },
        scales: {
          x: {
            type: "category",
            ticks: { color: "#ffffff" },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
          y: {
            type: "linear",
            ticks: {
              color: "#ffffff",
              callback: (value: string | number) => {
                const num = typeof value === "number" ? value : Number(value);
                return new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency,
                  maximumFractionDigits: 0,
                }).format(num);
              },
            },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
        },
      },
    };

    const chart = new Chart(ctx, chartConfig);
    return () => chart.destroy();
  }, [revenue, currency]);

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow">
      <canvas ref={canvasRef} />
    </div>
  );
}
