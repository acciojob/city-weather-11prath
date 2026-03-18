import React, { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "YOUR_API_KEY_HERE";

  useEffect(() => {
    if (query.length < 3) return; // 🔥 IMPORTANT FIX

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();

        if (data.cod === 200) {
          setWeather(data);
        } else {
          setWeather(null); // prevent crash
        }
      } catch (err) {
        setWeather(null);
      }
    };

    fetchWeather();
  }, [query]);

  return (
    <div>
      <h1>City Weather</h1>

      <input
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter city"
      />

      {/* ✅ SAFE RENDER */}
      {weather && weather.main && weather.weather && (
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