"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import "@/lib/chart/chartjs-config";

interface DonutChartProps {
  dataLabels: string[];
  dataValues: number[];
  colors?: string[];
}

export function DonutChart({
  dataLabels,
  dataValues,
  colors = ["#10b981", "#f59e0b", "#ef4444", "#6366f1", "#8b5cf6"],
}: DonutChartProps) {
  const data = {
    labels: dataLabels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: {
         backgroundColor: "rgba(0, 0, 0, 0.8)",
         padding: 12,
      }
    },
  };

  return (
    <div className="w-full h-[180px] flex items-center justify-center relative">
        <Doughnut data={data} options={options} />
    </div>
  );
}
