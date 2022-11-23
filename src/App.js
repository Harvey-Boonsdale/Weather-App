import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function App() {
  console.log("running");

  const [weather, changeWeather] = useState({
    icon: "",
    date: "",
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
      "https://api.openweathermap.org/data/2.5/weather?lat=53.344180&lon=-1.477420&units=metric&appid=68d92c74ce4c43f198d29b74a45995e4"
    );
    let success = checkStatus(res);
    if (!success) {
      alert("Error retrieving weather - please try again");
      return;
    }

    const convertedDate = res.data.dt;
    var day = new Date(convertedDate * 1000);

    changeWeather({
      icon: res.data.weather[0].icon,
      date: day.toDateString(),
      summary: res.data.weather[0].description,
      maxTemp: res.data.main.temp_max,
      minTemp: res.data.main.temp_min,
      wind: res.data.wind.speed,
    });
  }

  const listDays = async () => {
    let res = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast?lat=53.344180&lon=-1.477420&appid=68d92c74ce4c43f198d29b74a45995e4&units=metric"
    );

    let success = checkStatus(res);
    if (!success) {
      alert("Error retrieving next 4 days - please try again");
      return;
    }

    changeDays([
      res.data.list[0],
      res.data.list[8],
      res.data.list[16],
      res.data.list[24],
    ]);
  };

  useEffect(() => {
    fetchData();
    listDays();
  }, []);

  const makeNextDaysTable = () => {
    // map statement
    return days.map((day) => {
      console.log(day);
      // Convert date
      const convertedDate = day.dt;
      var newDay = new Date(convertedDate * 1000);
      console.log(newDay);

      return (
        <Card style={{ width: "13rem" }}>
          <Card.Img
            variant="top"
            src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
            alt="weather image"
          />
          <Card.Body>
            <Card.Title> {newDay.toDateString()} </Card.Title>

            <Card.Text> {day.weather[0].description} </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Max Temp: {day.main.temp_max} c</ListGroup.Item>
            <ListGroup.Item>Min Temp: {day.main.temp_min} c</ListGroup.Item>
            <ListGroup.Item>Wind speed: {day.wind.speed} km/h</ListGroup.Item>
          </ListGroup>
        </Card>
      );
    });
  };

  return (
    <div>
      <h3>Current Weather in Sheffield</h3>
      <img
        src={`http://openweathermap.org/img/w/${weather.icon}.png`}
        alt="weather image"
      />
      <p>
        <b>Date:</b> {weather.date}
      </p>
      <p>
        <b>Summary:</b> {weather.summary}
      </p>
      <p>
        <b>Maximum Temperature:</b> {weather.maxTemp}
        {"c"}
      </p>
      <p>
        <b>Minimum Temperature:</b> {weather.minTemp}
        {"c"}
      </p>
      <p>
        <b>Wind Speed:</b> {weather.wind}
        {"km/h"}
      </p>
      <h3>Next 4 days in Sheffield</h3>
      {makeNextDaysTable()}
    </div>
  );
}

export default App;
