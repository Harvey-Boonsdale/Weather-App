import React, { useState, useEffect } from "react";

async function App() {
  const [weather, changeWeather] = useState({
    date: "",
    day: "",
    summary: "",
    maxTemp: "",
    minTemp: "",
    wind: "",
  });

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(
        "https://api.openweathermap.org/data/3.0/onecall?lat={53.381130}&lon={53.381130}&appid={7b2dfaec12cb153a5690193e36f587ce}"
      );
      res = await res.json();
      console.log(res);
    }
    fetchData();
    changeWeather({
      date: "19 November",
      day: "Saturday",
      summary: "Cloudy and wet",
      maxTemp: "10c",
      minTemp: "5c",
      wind: "6kmh",
    });
  }, []);

  return (
    <div>
      <h1>Today's Weather</h1>
      <p>
        <b>Date:</b> {weather.date}{" "}
      </p>
      <p>
        <b>Day:</b> {weather.day}{" "}
      </p>
      <p>
        <b>Summary:</b> {weather.summary}{" "}
      </p>
      <p>
        <b>Maximum Temperature:</b> {weather.maxTemp}{" "}
      </p>
      <p>
        <b>Minimum Temperature:</b> {weather.minTemp}{" "}
      </p>
      <p>
        <b>Wind Speed:</b> {weather.wind}{" "}
      </p>
    </div>
  );
}

export default App;

// Weather API Link
// "https://api.openweathermap.org/data/3.0/onecall?lat={53.381130}&lon={53.381130}&appid={7b2dfaec12cb153a5690193e36f587ce}"
