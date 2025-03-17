import React from "react";

const WeatherTable = ({ city, data }) => {
    return (
      <div className="mt-4">
        <h3>Weather in {city}</h3>
        <table className="table table-bordered mt-2">
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.time}</td>
                <td>{entry.temp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default WeatherTable;