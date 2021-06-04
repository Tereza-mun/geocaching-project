import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../img/logo-home.png";
import "./style.css";

const Home = () => {
  return (
    <>
      <h2 className="heading">GEOCACHING</h2>
      <h3 className="subheading">in Stromovka</h3>
      <img className="logo-home" src={logo}></img>
      <p className="paragraph-home">
        Welcome to the ultimate geocaching game. Please read the rules carefully
        first, get your mobile phone and knowledge ready and let’s get this
        adventure started!
      </p>
      <Link style={{ textDecoration: "none" }} to="/username">
        <button className="button-home">Let's do this!</button>
      </Link>
    </>
  );
};
export default Home;
