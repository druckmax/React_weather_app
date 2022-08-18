import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faCloudSun,
  faCloudMoon,
  faCloud,
  faCloudShowersHeavy,
  faCloudRain,
  faCloudBolt,
  faSnowflake,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function WeatherIcon(props) {
  const [icon, setIcon] = useState(faSun);
  const [color, setColor] = useState("orange");

  const setHandler = (icon, color) => {
    setIcon(icon);
    setColor(color);
  };

  useEffect(() => {
    const iconStorage = [
      { "01d": faSun, classColor: "orange" },
      { "01n": faMoon, classColor: "lightGrey" },
      { "02d": faCloudSun, classColor: "orange" },
      { "02n": faCloudMoon, classColor: "darkGrey" },
      { "03d": faCloud, classColor: "grey" },
      { "03n": faCloud, classColor: "darkGrey" },
      { "04d": faCloud, classColor: "grey" },
      { "04n": faCloud, classColor: "darkGrey" },
      { "09d": faCloudShowersHeavy, classColor: "blue" },
      { "09n": faCloudShowersHeavy, classColor: "grey" },
      { "10d": faCloudRain, classColor: "blue" },
      { "10n": faCloudRain, classColor: "grey" },
      { "11d": faCloudBolt, classColor: "red" },
      { "11n": faCloudBolt, classColor: "red" },
      { "13d": faSnowflake, classColor: "snowBlue" },
      { "13n": faSnowflake, classColor: "snowBlue" },
      { "50d": faSmog, classColor: "lightGrey" },
      { "50n": faSmog, classColor: "darkGrey" },
    ];

    iconStorage.find((el) => {
      return (
        el.hasOwnProperty(props.weather) &&
        setHandler(el[props.weather], el.classColor)
      );
    });
  }, [props.weather]);

  return (
    <div>
      <FontAwesomeIcon className={color} icon={icon} size="4x" />
    </div>
  );
}

export default WeatherIcon;
