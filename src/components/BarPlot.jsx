// src/components/BarPlot.js
import React from "react";
import { Bar } from "react-chartjs-2";

const BarPlot = ({ data, category, color }) => {
  const categoryData = data.reduce((acc, record) => {
    const key = record[category] || "Unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(record.intensity);
    return acc;
  }, {});

  const labels = Object.keys(categoryData);
  const intensityData = labels.map(
    (label) =>
      categoryData[label].reduce((sum, value) => sum + value, 0) /
      categoryData[label].length
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `Average Intensity by ${category}`,
        data: intensityData,
        backgroundColor: color,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        labels: labels,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarPlot;
