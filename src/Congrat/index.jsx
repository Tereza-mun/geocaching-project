import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../img/trophy.png";
import "./style.css";

const Congrat = ({
  usernameW,
  scoreCounter,
  onLeave,
  hours,
  minutes,
  seconds,
}) => {
  useEffect(() => {
    return () => {
      console.log("player leaving");
      onLeave();
    };
  }, []);

  return (
    <>
      <h2 className="heading">Congratulations {usernameW}!</h2>
      <img className="logo-congrat" src={logo}></img>

      <button className="btn-points">{scoreCounter} POINTS</button>

      <div>
        You have finished this game in {hours}: {minutes}: {seconds} and walked
        over 4 kms.
      </div>
    </>
  );
};
export default Congrat;
