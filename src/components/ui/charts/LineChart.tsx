"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import "@/lib/chart/chartjs-config";

interface LineChartProps {
  dataLabels: string[];
  dataValues: number[];
  label?: string;
  color?: string;
  fillColor?: string;
}

export function LineChart({
  dataLabels,
  dataValues,
  label = "Requests",
  color = "#10b981",
  fillColor = "rgba(16, 185, 129, 0.15)",
}: LineChartProps) {
  const data = {
    labels: dataLabels,
    datasets: [
      {
        label,
        data: dataValues,
        borderColor: color,
        backgroundColor: fillColor,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        intersect: false,
        mode: "index" as const,
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
      },
      y: {
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  return (
    <div className="w-full h-[150px] mt-4">
      <Line data={data} options={options} />
    </div>
  );
}
