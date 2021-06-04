import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
import spendlikUrl from "../img/spendlik.svg";
import infoUrl from "../img/magnifier.svg";
import "./marker.css";
import "./zoom.css";
import { pinpoints } from "./pinpoints.js";

const Map00 = () => {
  const [viewport, setViewport] = useState({
    latitude: 50.1045369,
    longitude: 14.4310347,
    zoom: 13,
  });

  const [popupOtevren, setPopupOtevren] = useState(false);

  const [questionPop, setQuestionPop] = useState(false);

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
              // attribution:
              //   'Mapové podklady od <a target="_top" rel="noopener" href="https://mapy.cz/">Seznam.cz</a> a <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>.',
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
            onGeolocate={(event) => {
              console.log(event);
            }}
            auto
          />
        </div>

        <Marker
          latitude={50.1045369}
          longitude={14.4310347}
          offsetLeft={-25}
          offsetTop={-50}
        >
          <button
            className="marker-button"
            onClick={() => setPopupOtevren(true)}
          >
            <img src={spendlikUrl} width={50} height={50} />
          </button>
        </Marker>
        {popupOtevren && (
          <Popup
            latitude={50.1045369}
            longitude={14.4310347}
            offsetTop={-35}
            onClose={() => setPopupOtevren(false)}
          >
            START HERE
          </Popup>
        )}
        {pinpoints
          .filter(
            (pinpoint) =>
              questionPop === false || pinpoint.ikonaUrl !== infoUrl,
          )
          .map((pinpoint) => (
            <Marker
              key={pinpoint.id}
              latitude={pinpoint.latitude}
              longitude={pinpoint.longitude}
              offsetLeft={-15}
              offsetTop={-15}
            >
              <img src={pinpoint.ikonaUrl} width={30} height={30} alt="" />
            </Marker>
          ))}
      </ReactMapGL>
      <button onClick={() => setQuestionPop(!questionPop)}>
        {questionPop ? "show" : "hide"} questions
      </button>
    </>
  );
};
export default Map00;
