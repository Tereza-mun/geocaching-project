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
        Welcome to the ultimate geocaching game. Please read the rules carefully
        first, get your mobile phone and knowledge ready and let’s get this
        adventure started!
      </p>
      <form className="username-form">
        <input
          value={values}
          onChange={handleUsernameInput}
          type="text"
          placeholder="Username"
        />

        <p className="paragraph-username">
          Choose a username to start your journey
        </p>
        <Link style={{ textDecoration: "none" }} to="/welcome">
          {values.length < 2 ? (
            <button
              onClick={handleUsernameSubmit}
              disabled
              style={{
                border: "solid grey",
              }}
            >
              Submit
            </button>
          ) : (
            <button onClick={handleUsernameSubmit}>Submit</button>
          )}
        </Link>
      </form>
    </>
  );
};
export default Username;
