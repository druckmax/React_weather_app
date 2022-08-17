import Card from "./components/Card";

import React, { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState({});

  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        // get coordinates
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        // fetch the city with reverse geocoding
        const resGeo = await fetch(
          `http://api.positionstack.com/v1/reverse?access_key=${process.env.REACT_APP_GEOCODE_KEY}&query=${lat},${lng}&limit=1`
        );

        if (!resGeo.ok) throw new Error("Problem getting location data");
        const dataGeo = await resGeo.json();

        const city = dataGeo.data[0].administrative_area;

        // fetch weather data with cityname
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        );
        const asyncData = await res.json();
        setData(asyncData);
      } catch (error) {
        return console.error(error);
      }
    };
    getUserLocation();
  }, []);

  // Get user input
  const getInputValue = (e) => setValue(e.target.value);

  // get weather info on submit
  const getWeatherInfo = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    const asyncData = await res.json();
    setData(asyncData);
  };

  return (
    <div className="wrapper">
      <h1>Weather App</h1>
      <form onSubmit={getWeatherInfo} className="buttonGroup">
        <input
          onChange={getInputValue}
          type="text"
          name="userInput"
          id="userInput"
          placeholder="Insert your City"
        />
        <button type="submit">Get Weather Data</button>
      </form>
      <Card data={data} />
    </div>
  );
}

export default App;
