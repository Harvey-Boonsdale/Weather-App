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
    console.log("fetching");
    let res = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=50&lon=50&appid=68d92c74ce4c43f198d29b74a45995e4"
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
      "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=68d92c74ce4c43f198d29b74a45995e4&units=metric"
    );
    // console.log(res.data.list[0], res.data.list[7]);
    console.log(res.data.list[0], res.data.list[7]);
    let success = checkStatus(res);
    if (!success) {
      alert("Error retrieving next 4 days - please try again");
      return;
    }
  };

  useEffect(() => {
    // fetchData();
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
