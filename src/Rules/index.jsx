import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "./style.css";

const Rules = () => {
  return (
    <>
      <Popup trigger={<button> Rules</button>} position="center">
        <div className="rules">
          <p> &#8226; Starting position: 50.1047600N, 14.4313575E</p>
          <p>
            &#8226; There are 8 checkpoints, questions are related to the
            location you are at.
          </p>
          <p>
            &#8226; Once you get to the location, your GPS will validate it and
            the question will be revealed.
          </p>

          <p>
            &#8226; After answering the question next location will be unlocked.
          </p>
        </div>
      </Popup>

      {/* <Popup>
        onClick=
        {() => {
          console.log("modal closed ");
          close();
        }}
      </Popup> */}

      {/* <Link style={{ textDecoration: "none" }} to="/">
        <button>Back Home</button>
      </Link> */}
    </>
  );
};
export default Rules;
