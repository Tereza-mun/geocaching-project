import React from "react";
import "./style.css";

const Rules = () => {
  return (
    <>
      <h2 className="heading">Geocache Rules</h2>
      <ul className="paragraph-rules--list">
        <li>
          You will be given a starting point where you will find the first
          question. As soon as you get to the location, your GPS will validate
          your position and the question will be revealed.
        </li>
        <li>
          Questions are in the form of multiple choice and by answering
          correctly the first time you will earn 1000 points, second time 750
          points, third time 500 points, otherwise you get a 0 and the following
          checkpoint will be revealed.
        </li>
        <li>
          Next question will be shown after you confirm your location at the
          checkpoint. There will be a total of 8 checkpoints and to start the
          game, first get to the starting position: 50.1047600N, 14.4313575E and
          then click START GAME.
        </li>
      </ul>
    </>
  );
};
export default Rules;
