"use client";

import React, { useEffect, useRef } from "react";
import {
  Chart,
  ChartConfiguration,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components you need
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
        labels: revenue.map((r) => r.month),
        datasets: [
          {
            label: "Revenue",
            data: revenue.map((r) => r.amount),
            backgroundColor: "rgba(59, 130, 246, 0.8)", // Tailwind blue-500
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
            labels: {
              color: "#ffffff", // white legend text
              font: { weight: "bold" },
            },
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
            ticks: {
              color: "#ffffff",
            },
            grid: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          y: {
            type