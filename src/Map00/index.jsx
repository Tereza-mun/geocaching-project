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

const Map00 = () => {
  const pinpoints = [
    {
      // PLANETARIUM - GIORDANO BRUNO
      id: 1,
      ikonaUrl: infoUrl,
      latitude: 50.105291,
      longitude: 14.427648,
    },
    {
      // RYBNIK - DUCK HEADS alebo ROSTLINKY TABULA
      id: 2,
      ikonaUrl: infoUrl,
      latitude: 50.1070722,
      longitude: 14.4221119,
    },
    {
      // CITARNA
      id: 3,
      ikonaUrl: infoUrl,
      latitude: 50.1076472,
      longitude: 14.4176525,
    },
    {
      // STARA FONTANA + JAPANESE TREE
      id: 4,
      ikonaUrl: infoUrl,
      latitude: 50.1058994,
      longitude: 14.4140292,
    },
    {
      // STUDNICNI DOMEK
      id: 5,
      ikonaUrl: infoUrl,
      latitude: 50.1049194,
      longitude: 14.4083556,
    },
    {
      // PAMATNIK MECSEROVY SILNICE
      id: 6,
      ikonaUrl: infoUrl,
      latitude: 50.1044306,
      longitude: 14.4150547,
    },
    {
      // OSTROVCEK - JEZERO SLUNECNICE
      id: 7,
      ikonaUrl: infoUrl,
      latitude: 50.1062383,
      longitude: 14.4166774,
    },
    {
      // SLECHTOVA RESTAURACE - 30 HLAV
      id: 8,
      ikonaUrl: infoUrl,
      latitude: 50.1048456,
      longitude: 14.417837,
    },
  ];

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
