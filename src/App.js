import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [weather, changeWeather] = useState({
    date: "",
    day: "",
    summary: "",
    maxTemp: "",
    minTemp: "",
    wind: "",
  });
  const [days, changeDays] = useState([]);

  const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      return false;
    }
  };

  async function fetchData() {
    let res = await axios.get(
      "api.openweathermap.org/data/2.5/forecast/daily?lat={53.381130}&lon={53.381130}&cnt={5}&appid={bc5a7368c606db7357598739c51c174b}"
    );
    let success = checkStatus(res);
    if (!success) {
      alert("Error retrieving weather - please try again");
      return;
    }
    console.log(res);
  }

  const listDays = async () => {
    let res = await axios.get(
      "api.openweathermap.org/data/2.5/forecast/daily?lat={53.381130}&lon={53.381130}&cnt={5}&appid={bc5a7368c606db7357598739c51c174b}"
    );
    let success = checkStatus(res);
    if (!success) {
      alert("Error retrieving next 4 days - please try again");
      return;
    }
  };

  useEffect(() => {
    fetchData();
    changeWeather({
      date: "19 November",
      day: "Saturday",
      summary: "Cloudy and wet",
      maxTemp: "10c",
      minTemp: "5c",
      wind: "6kmh",
    });
    listDays();
  }, []);

  const makeNextDaysTable = () => {
    return <div>This will display the next 4 days</div>;
  };

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
      {makeNextDaysTable()}
    </div>
  );
}

export default App;

// Weather API Link
// "https://api.openweathermap.org/data/3.0/onecall?lat={53.381130}&lon={53.381130}&appid={bc5a7368c606db7357598739c51c174b}"
