// src/components/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data, category }) => {
  const categoryData = data.reduce((acc, record) => {
    const key = record[category] || "Unknown";
    if (!acc[key]) acc[key] = 0;
    acc[key] += 1;
    return acc;
  }, {});

  const labels = Object.keys(categoryData);
  const countData = labels.map((label) => categoryData[label]);

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#C9CBCF",
    "#E7E9ED",
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `Distribution by ${category}`,
        data: countData,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <div
      className="chart-container"
      style={{ height: "650px", width: "700px" }}
    >
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
