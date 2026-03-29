"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import "@/lib/chart/chartjs-config";

interface BarChartProps {
  dataLabels: string[];
  dataValues: number[];
  label?: string;
  color?: string;
  indexAxis?: "x" | "y";
}

export function BarChart({
  dataLabels,
  dataValues,
  label = "Value",
  color = "#047857",
  indexAxis = "y",
}: BarChartProps) {
  const data = {
    labels: dataLabels,
    datasets: [
      {
        label,
        data: dataValues,
        backgroundColor: color,
        borderRadius: 4,
        barPercentage: 0.5,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options = {
    indexAxis,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 13, family: "Inter, sans-serif" },
        bodyFont: { size: 13, family: "Inter, sans-serif" },
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { display: indexAxis === "x" },
      },
      y: {
        grid: { display: false, drawBorder: false },
        ticks: { 
            font: { family: "Inter, sans-serif", size: 12, weight: 500 },
            color: "#9ca3af",
            display: true 
        },
      },
    },
  };

  return (
    <div className="w-full h-[220px]">
      <Bar data={data} options={options as any} />
    </div>
  );
}
