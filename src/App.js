// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import BarPlot from "./components/BarPlot";
import LinePlot from "./components/LinePlot";
import PieChart from "./components/PieChart";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    // Fetch data and filters on component mount
    axios.get("http://localhost:8080/v1/api/visualisation").then((response) => {
      setData(response.data);
    });

    axios
      .get("http://localhost:8080/v1/api/visualisation/filters")
      .then((response) => {
        const cleanedFilters = Object.fromEntries(
          Object.entries(response.data).map(([key, value]) => [
            key,
            value.filter((v) => v !== null),
          ])
        );
        setFilters(cleanedFilters);
      });
  }, []);

  const handleFilterChange = (name, value) => {
    setSelectedFilters({ ...selectedFilters, [name]: value });
  };

  const applyFilters = () => {
    const queryParams = new URLSearchParams(selectedFilters).toString();
    axios
      .get(`http://localhost:8080/v1/api/visualisation?${queryParams}`)
      .then((response) => {
        setData(response.data);
      });
  };

  return (
    <div className="container">
      <h1 className="mt-3">Data Visualization Tool</h1>
      <Filter filters={filters} onFilterChange={handleFilterChange} />
      <button className="btn btn-primary mt-3" onClick={applyFilters}>
        Apply Filters
      </button>

      <div className="mt-5">
        <h2>Average Intensity by Sector</h2>
        <BarPlot
          data={data}
          category="sector"
          color="rgba(75, 192, 192, 0.6)"
        />
        <h2>Average Intensity by Topic</h2>
        <BarPlot
          data={data}
          category="topic"
          color="rgba(153, 102, 255, 0.6)"
        />
        <h2>Average Intensity by Region</h2>
        <BarPlot
          data={data}
          category="region"
          color="rgba(255, 159, 64, 0.6)"
        />
        <h2>Average Intensity by PESTLE Category</h2>
        <BarPlot
          data={data}
          category="pestle"
          color="rgba(255, 99, 132, 0.6)"
        />
      </div>

      <div className="mt-5">
        <h2>Distribution of Sectors</h2>
        <PieChart data={data} category="sector" />
      </div>

      <div className="mt-5">
        <h2>Trends Over Time</h2>
        <LinePlot data={data} />
      </div>
    </div>
  );
};

export default App;
