import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CityButton from "./components/Button";
import WeatherTable from "./components/Data";
import CityInput from "./components/Input";

function App() {
  const [cities, setCities] = useState(["Austin", "Dallas", "Houston"]);
  const [selectedCity, setSelectedCity] = useState("Austin");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  const getCoordinates = async (city) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
      const data = await response.json();
      if (data.length === 0) throw new Error("City not found");
      return { lat: data[0].lat, lon: data[0].lon };
    } catch (error) {
      throw new Error("Error fetching coordinates");
    }
  };

  const fetchWeather = async (city) => {
    try {
      const { lat, lon } = await getCoordinates(city);
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
      );
      const data = await response.json();
      if (!data.hourly) throw new Error("Weather data not available");

      setWeatherData(data.hourly.temperature_2m.slice(0,24).map((temp, index) => ({
        time: `${(index + 1) % 12 || 12}:00 ${index < 11 ? 'PM' : 'AM'}`,
        temp: `${Math.round(temp * 9/5 + 32)} F`
      })));
      setSelectedCity(city);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWeather("Austin"); 
  }, []);

  const addCity = async (newCity) => {
    if (newCity && !cities.includes(newCity)) {
      try {
        await getCoordinates(newCity); // ensure city exists before adding
        setCities([...cities, newCity]);
        fetchWeather(newCity);
      } catch (error) {
        setError("Invalid city. Cannot be added.");
      }
    }
  };

  return (
    <div className="container text-center mt-4">
      <div className="d-flex justify-content-center mb-3">
        {cities.map((city, index) => (
          <CityButton key={index} name={city} onClick={() => fetchWeather(city)} selected={city === selectedCity} />
        ))}
      </div>
      <CityInput onAddCity={addCity} />
      {error && <div className="text-danger mt-2">{error}</div>}
      {selectedCity && !error && <WeatherTable city={selectedCity} data={weatherData} />}
    </div>
  );
}

export default App;