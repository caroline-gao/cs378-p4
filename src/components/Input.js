import React, { useState } from "react";

const Input = ({ onAddCity }) => {
  const [city, setCity] = useState("");

  const handleAddCity = () => {
    if (city.trim()) {
      onAddCity(city.trim());
      setCity("");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <input
        type="text"
        className="form-control w-25"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn btn-secondary ml-2" onClick={handleAddCity}>+</button>
    </div>
  );
};

export default Input;