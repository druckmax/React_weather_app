import Card from "./components/Card";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorWindow from "./components/ErrorWindow";

import React, { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDenied, setIsDenied] = useState(false);

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
        const requestOptions = {
          method: "GET",
        };

        const resGeo = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${process.env.REACT_APP_GEOCODE_KEY2}`,
          requestOptions
        );

        if (!resGeo.ok) throw new Error("Problem getting location data");
        const dataGeo = await resGeo.json();

        // Get city name from returned object
        const city = dataGeo.features[0].properties.city;

        // fetch weather data with cityname
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        );

        if (!res.ok) throw new Error("Problem getting the weather data");
        const asyncData = await res.json();

        // console.log(asyncData)

        setData(asyncData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsDenied(true);
        return console.error(error);
      }
    };
    getUserLocation();
  }, [setData, setIsLoading, setIsDenied]);

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
      {isDenied && <ErrorWindow text="Accessing your location was denied" />}
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
      {isLoading ? <LoadingSpinner /> : <Card data={data} />}
    </div>
  );
}

export default App;
