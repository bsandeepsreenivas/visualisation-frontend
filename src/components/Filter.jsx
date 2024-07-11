import React from "react";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Filter = ({ filters, onFilterChange }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <div className="row">
      {Object.keys(filters).map((filter) => (
        <div className="col-md-3 mt-3" key={filter}>
          <label htmlFor={filter} className="form-label">
            {capitalizeFirstLetter(filter)}
          </label>
          <select
            id={filter}
            name={filter}
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Select {capitalizeFirstLetter(filter)}</option>
            {filters[filter].map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default Filter;
