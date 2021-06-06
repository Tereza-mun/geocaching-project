import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
import spendlikUrl from "../img/spendlik.svg";
// import infoUrl from "../img/magnifier.svg";
import "./marker.css";
import "./zoom.css";
import { pinpoints } from "./pinpoints.js";
import { useHistory } from "react-router-dom";

const Map00 = (props) => {
  const getDistance = (point1, point2) => {
    const R = 6371e3; // metres
    const φ1 = (point1.latitude * Math.PI) / 180; // φ, λ in radians
    const φ2 = (point2.latitude * Math.PI) / 180;
    const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
    const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // in metres
    console.log(d);

    return d;
  };

  const history = useHistory();

  const [inRange, setInRange] = useState(false);

  const [viewport, setViewport] = useState({
    latitude: 50.1045369,
    longitude: 14.4310347,
    zoom: 14,
  });

  // const [questionPop, setQuestionPop] = useState(false);

  const handleActualLocation = (e) => {
    const distance = getDistance(e.coords, {
      latitude: props.currentQuestion.latitude,
      longitude: props.currentQuestion.longitude,
    });
    if (distance <= 50) {
      setInRange(true);
    }
  };

  const handleNextQuestion = () => {
    history.push("/question");
  };

  const message = inRange ? "Show question" : "Get closer";

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapStyle={{
          version: 8,
          sources: {
            "raster-tiles": {
              type: "raster",
              tiles: ["https://mapserver.mapy.cz/base-m/{z}-{x}-{y}"],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: "simple-tiles",
              type: "raster",
              source: "raster-tiles",
              minzoom: 0,
              maxzoom: 20,
            },
          ],
        }}
        width="100%"
        height={400}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <div className="ovladani">
          <NavigationControl />
          <GeolocateControl
            style={{
              right: 10,
              top: 10,
            }}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            showAccuracyCircle={false}
            onGeolocate={handleActualLocation}
            auto
          />
        </div>

        <Marker
          latitude={props.currentQuestion.latitude}
          longitude={props.currentQuestion.longitude}
          offsetLeft={-25}
          offsetTop={-50}
        >
          <button className="marker-button">
            <img src={spendlikUrl} width={50} height={50} />
          </button>
        </Marker>
      </ReactMapGL>

      <button
        onClick={handleNextQuestion}
        className={inRange ? "btn btn--on" : "btn"}
        disabled={!inRange}
      >
        {message}
      </button>

      <div className="score">
        {props.usernameW}: {props.scoreCounter} points
      </div>
    </>
  );
};

export default Map00;
