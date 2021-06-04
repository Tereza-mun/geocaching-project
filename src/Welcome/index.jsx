import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../img/logo-welcome.png";
import "./style.css";

const Welcome = ({ usernameW }) => {
  return (
    <>
      <h2 className="heading">Welcome!</h2>
      <img className="logo-welcome" src={logo}></img>
      <div className="paragraph-welcome">
        <h3 className="subheading-welcome">Hello {usernameW},</h3>
        <p>Discover Stromovka park through our Geocache quizzes.</p>
        <p>Stay active, stay happy and test your knowledge.</p>
      </div>
      <Link style={{ textDecoration: "none" }} to="/essentials">
        <button>Next</button>
      </Link>
    </>
  );
};
export default Welcome;
