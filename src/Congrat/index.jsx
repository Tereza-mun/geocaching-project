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
      <h2 className="heading">Congratulations</h2>
      <h3 className="subheading">{usernameW}!</h3>
      <img className="logo-congrat" src={logo}></img>

      <button className="btn-winner">{scoreCounter} POINTS</button>

      <p className="paragraph-congrat">
        You have finished this game in {hours}: {minutes}: {seconds} and walked
        over 4 kms.
      </p>
    </>
  );
};
export default Congrat;
