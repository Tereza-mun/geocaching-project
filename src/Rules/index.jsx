import React from "react";
import Popup from "reactjs-popup";
import "./style.css";

const Rules = () => {
  return (
    <>
      <Popup trigger={<button> Rules</button>} position="center">
        <div className="rules">
          <p>
            &#8226; There are 8 checkpoints, each holding a question, which can
            be revealed when in radius of 50 meters.
          </p>
          <p>
            &#8226; Answering correctly on first try will bring you 1000 points,
            on second try 750 points, third is worth 500 points and fourth 250
            points.
          </p>
          <p>
            &#8226; Next location is revelead after answering the current
            question.
          </p>
          <p>
            &#8226; The goal is to earn max possible points and to have fun!
          </p>
        </div>
      </Popup>
    </>
  );
};
export default Rules;
