import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../img/logo-home.png";
import "./style.css";

const Username = (props) => {
  const [values, setValues] = useState("");

  const handleUsernameSubmit = () => {
    props.helloUsername(values);
  };

  const handleUsernameInput = (e) => {
    setValues(e.target.value);
  };

  return (
    <>
      <h2 className="heading">GEOCACHING</h2>
      <h3 className="subheading">in Stromovka</h3>
      <img className="logo-username" src={logo}></img>
      <p className="paragraph-home">
        Discover Stromovka park through our Geocache quizzes. Please read the
        rules first and make sure to allow access to your GPS location.
      </p>
      <form className="username-form">
        <input
          className="username-input"
          value={values}
          onChange={handleUsernameInput}
          type="text"
          placeholder="Username"
        />

        <p className="paragraph-username">
          Create a username to start your journey
        </p>
        <Link style={{ textDecoration: "none" }} to="/map00">
          {values.length < 2 ? (
            <button
              onClick={handleUsernameSubmit}
              disabled
              style={{
                border: "solid grey",
              }}
            >
              Start Game
            </button>
          ) : (
            <button onClick={handleUsernameSubmit}>Start Game</button>
          )}
        </Link>
      </form>
    </>
  );
};
export default Username;
