// src/components/LinePlot.js
import React from "react";
import { Line } from "react-chartjs-2";

const LinePlot = ({ data }) => {
  const groupedData = data.reduce((acc, record) => {
    const year = record.endYear;
    if (!acc[year]) {
      acc[year] = { intensity: [], likelihood: [], relevance: [] };
    }
    if (record.intensity !== null) acc[year].intensity.push(record.intensity);
    if (record.likelihood !== null)
      acc[year].likelihood.push(record.likelihood);
    if (record.relevance !== null) acc[year].relevance.push(record.relevance);
    return acc;
  }, {});

  const labels = Object.keys(groupedData).sort();
  const intensityData = labels.map(
    (label) =>
      groupedData[label].intensity.reduce((sum, value) => sum + value, 0) /
      groupedData[label].intensity.length
  );
  const likelihoodData = labels.map(
    (label) =>
      groupedData[label].likelihood.reduce((sum, value) => sum + value, 0) /
      groupedData[label].likelihood.length
  );
  const relevanceData = labels.map(
    (label) =>
      groupedData[label].relevance.reduce((sum, value) => sum + value, 0) /
      groupedData[label].relevance.length
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Average Intensity",
        data: intensityData,
        borderColor: "rgba(75, 192, 192, 0.6)",
        fill: false,
      },
      {
        label: "Average Likelihood",
        data: likelihoodData,
        borderColor: "rgba(153, 102, 255, 0.6)",
        fill: false,
      },
      {
        label: "Average Relevance",
        data: relevanceData,
        borderColor: "rgba(255, 159, 64, 0.6)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "End Year",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Values",
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LinePlot;
