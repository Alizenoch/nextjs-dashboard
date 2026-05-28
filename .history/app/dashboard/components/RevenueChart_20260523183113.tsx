// app/dashboard/components/RevenueChart.tsx
"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface RevenueChartProps {
  revenue: { month: string; amount: number }[];
  currency: "USD" | "PGK";
}

export default function RevenueChart({ revenue, currency }: RevenueChartProps) {
  const data = {
    labels: revenue.map((r) => r.month),
    datasets: [
      {
        label: `Revenue (${currency})`,
        data: revenue.map((r) => r.amount),
        borderColor: "rgba(59, 130, 246, 1)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#fff" },
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency,
              maximumFractionDigits: 0,
            }).format(Number(context.raw)),
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: {
          color: "#fff",
          callback: (tickValue: string | number) =>
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency,
              maximumFractionDigits: 0,
            }).format(Number(tickValue)),
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  return (
    <div className="h-full">
      <Line data={data} options={options} />
    </div>
  );
}
