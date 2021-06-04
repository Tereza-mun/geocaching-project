import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../img/trophy.png";
import "./style.css";

const Congrat = ({ usernameW }) => {
  return (
    <>
      {/* musime to vycentrovat */}
      <h2 className="heading">Congratulation {usernameW}!</h2>
      <img className="logo-congrat" src={logo}></img>

      <button className="btn-points">... POINTS</button>
    </>
  );
};
export default Congrat;
