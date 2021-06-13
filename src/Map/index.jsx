import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  Marker,
  GeolocateControl,
  WebMercatorViewport,
} from "react-map-gl";
import spendlikUrl from "../img/spendlik.svg";
import "./marker.css";
import "./style.css";
import Question from "../Question/index";
import Popup from "reactjs-popup";

const Map = ({
  currentQuestion,
  userLocation,
  setUserLocation,
  score,
  username,
  scoreCounter,
  hours,
  minutes,
  seconds,
  start,
}) => {
  const getDistance = (point1, point2) => {
    const R = 6371e3;
    const φ1 = (point1.latitude * Math.PI) / 180;
    const φ2 = (point2.latitude * Math.PI) / 180;
    const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
    const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  };

  const [inRange, setInRange] = useState(false);

  const [viewport, setViewport] = useState({
    latitude: 50.1045369,
    longitude: 14.4310347,
    zoom: 14,
  });

  const [isOpen, setIsOpen] = useState(false);

  const getViewport = (point1, point2) => {
    return new WebMercatorViewport({
      width: Math.min(window.innerWidth, 480) - 60,
      height: 400,
    }).fitBounds(
      [
        [point1.longitude, point1.latitude],
        [point2.longitude, point2.latitude],
      ],
      {
        padding: 50,
        offset: [0, -100],
      },
    );
  };

  const handleCurrentLocation = (e) => {
    const userCurrentLocation = e.coords;
    setUserLocation(e);

    const questionLocation = {
      latitude: currentQuestion.latitude,
      longitude: currentQuestion.longitude,
    };

    const distance = getDistance(userCurrentLocation, questionLocation);
    if (distance <= 50) {
      setInRange(true);
    }

    const nextViewport = getViewport(userCurrentLocation, questionLocation);

    const finalViewport = {
      ...nextViewport,
      zoom: Math.min(nextViewport.zoom, 16),
    };
    setViewport(finalViewport);
  };

  useEffect(() => {
    if (userLocation) {
      handleCurrentLocation(userLocation);
    }
  }, [currentQuestion.longitude]);

  const handleNextQuestion = () => {
    setIsOpen(true);
    start();
  };

  const message = inRange ? "Show question" : "Get closer to the next location";

  return (
    <>
      <div className="score">
        {username}: {scoreCounter} points
      </div>
      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
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
      >
        <div className="ovladani">
          <GeolocateControl
            style={{
              right: 10,
              top: 10,
            }}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            showAccuracyCircle={false}
            onGeolocate={handleCurrentLocation}
            auto
          />
        </div>

        <Marker
          latitude={currentQuestion.latitude}
          longitude={currentQuestion.longitude}
          offsetLeft={-25}
          offsetTop={-50}
        >
          <button className="marker-button">
            <img src={spendlikUrl} width={50} height={50} />
          </button>
        </Marker>

        {!isOpen && (
          <button
            onClick={handleNextQuestion}
            className={inRange ? "btn btn--on" : "btn"}
            disabled={!inRange}
          >
            {message}
          </button>
        )}

        <Popup
          modal={true}
          open={isOpen}
          overlayStyle={{ background: "rgba(0,0,0,0.4)" }}
          onClose={() => setIsOpen(false)}
        >
          <Question
            currentQuestion={currentQuestion}
            score={score}
            isOpen={setIsOpen}
            setInRange={setInRange}
          />
        </Popup>
      </ReactMapGL>

      <div className="timer">
        Timer: <span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
    </>
  );
};

export default Map;
