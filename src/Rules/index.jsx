import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style.css";

const Rules = () => {
  return (
    <>
      <h2 className="subheading">Geocache Rules</h2>
      <div className="paragraph-rules">
        <p> &#8226; Starting position: 50.1047600N, 14.4313575E</p>
        <p>
          &#8226; There are 8 checkpoints, questions are related to the location
          you are at.
        </p>
        <p>
          &#8226; Once you get to the location, your GPS will validate it and
          the question will be revealed.
        </p>

        <p>
          &#8226; After answering the question next location will be unlocked.
        </p>
      </div>

      {/* WILL BE ABLE TO START GAME only if USERNAME created else will be
      redirected to USERNAME PAGE */}

      <Link style={{ textDecoration: "none" }} to="/map00">
        <button>Start Game</button>
      </Link>
    </>
  );
};
export default Rules;
