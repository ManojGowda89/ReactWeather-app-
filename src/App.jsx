import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});

  function handleSearch(e) {
    e.preventDefault();

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1c3440c30571f61d8ffe5fcc82c69d25`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert('Error fetching weather data: ' + error.message);
      });
  }

  useEffect(() => {
    handleGetLocationWeather();
  }, []); // Fetch location weather on component mount

  function handleGetLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1c3440c30571f61d8ffe5fcc82c69d25`)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            alert('Error fetching weather data: ' + error.message);
          });
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }

  const renderData = () => {
    if (data && Object.keys(data).length !== 0) {
      return (
        <div className="weather-data" style={{ color: "white", fontFamily: "Arial, sans-serif" }}>
          <h1>Weather Data</h1>
          <h3>
            Location : <span className="data-label">{data.name}</span>
          </h3>
          <h3>
            Latitude : <span className="data-label">{data.coord ? data.coord.lat : ""}</span>
          </h3>
          <h3>
            Longitude : <span className="data-label">{data.coord ? data.coord.lon : ""}</span>
          </h3>
          <h3>
            Clouds: <span className="data-value">{data.weather ? data.weather[0].description : ""}</span>
          </h3>
          <h3>
            Temperature : <span className="data-value">{data.main ? data.main.temp : ""}</span>
          </h3>
          <h4>
            Minimum temperature : <span className="data-value">{data.main ? data.main.temp_min : ""}</span> {"  "}
            Max temperature : <span className="data-value">{data.main ? data.main.temp_max : ""}</span>
          </h4>
          <h3>
            Pressure : <span className="data-value">{data.main ? data.main.pressure : ""}</span>
          </h3>
          <h3>
            Humidity : <span className="data-value">{data.main ? data.main.humidity : ""}</span>
          </h3>
          <h3>
            Visibility : <span className="data-value">{data.visibility}</span>
          </h3>
          <h3>
            Windspeed : <span className="data-value">{data.wind ? data.wind.speed : ""}</span>
          </h3>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <br/>
      <center><h1 className="app-title" style={{ color: "white", fontFamily: "Arial, sans-serif" }}>Weather APP</h1></center>
      <div className="container border">
        <div className="mb-3">
          <br/>
          <form onSubmit={handleSearch}> 
            <input type="text" className="form-control" placeholder="Enter location" value={location} onChange={(event) => setLocation(event.target.value)} required style={{ fontFamily: "Arial, sans-serif" }} />
            <button type="submit" className="btn btn-primary mt-3" style={{ fontFamily: "Arial, sans-serif" }}>Search</button>{" "}
            <button className="btn btn-danger mt-3" onClick={(e) => {
              e.preventDefault();
              setLocation(""); // Clear location input
              setData({}); // Clear weather data
            }} style={{ fontFamily: "Arial, sans-serif" }}>New</button>
          </form>
        </div>
        {renderData()}
      </div>
    </div>
  );
}

export default App;
