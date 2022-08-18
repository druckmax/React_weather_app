import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureEmpty,
  faTemperatureFull,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons";

import WeatherIcon from "./WeatherIcon";

function Card(props) {

  const {
    name = "City",
    main: {
      temp = 0.0,
      feels_like = 0.0,
      humidity = 0.0,
      pressure = 0.0,
      temp_min = 0.0,
      temp_max = 0.0,
    } = {},
    sys: { country= "Country" } = {},
    weather = [{icon: '01d'}],
  } = props.data;

  return (
    <div className="cardWrapper">
      <FontAwesomeIcon className="sunIcon" icon={faCloudSun} />
      <div className="cardContainer">
        <div className="card cardLeft">
          <h2>{temp.toFixed(1)}°C</h2>
          <p>Feels like {feels_like?.toFixed(1)}°C</p>
          <WeatherIcon weather={weather[0].icon} data={props.data}/>
          <h3>
            {name}, {country}
          </h3>
        </div>
        <div className="card cardRight">
          <p>Humidity: {humidity}%</p>
          <p>Pressure: {pressure}</p>
          <p>
            <FontAwesomeIcon icon={faTemperatureEmpty} className="cold"/> Min:
          {' ' + temp_min?.toFixed(1)}°C
          </p>
          <p>
            <FontAwesomeIcon icon={faTemperatureFull} className="hot"/> Max:
            {' ' + temp_max?.toFixed(1)}°C
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
