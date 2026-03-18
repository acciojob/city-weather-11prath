import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = () => {
    if (!query) return;

    const mockData = {
      name: query,
      main: { temp: 25 },
      weather: [
        {
          description: "clear sky",
          icon: "01d",
        },
      ],
    };

    setWeather(mockData);

    // clear input after submit
    setQuery("");
  };

  return (
    <div>
      <h1>City Weather</h1>

      <input
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchWeather();
          }
        }}
        placeholder="Enter city"
      />

      {weather && (
        <div className="weather">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;