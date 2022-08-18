import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";

function LoadingSpinner(props) {
  return (
    <div className="cardWrapper">
      <FontAwesomeIcon className="sunIcon" icon={faCloudSun} />
      <div className="cardContainer">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
