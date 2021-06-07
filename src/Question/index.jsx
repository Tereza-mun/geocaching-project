import React, { useState } from "react";

import logo from "../img/logo-chat.png";

import "./style.css";

const Question = (props) => {
  console.log(props.currentQuestion);

  const otazka = props.currentQuestion.questionText;
  const moznosti = props.currentQuestion.answerOptions;

  const [failTry, setFailTry] = useState(0);

  const [clickedAnswers, setClickedAnswers] = useState([
    false,
    false,
    false,
    false,
  ]);

  const addPoints = () => {
    if (failTry === 0) {
      props.score(1000);
    } else if (failTry === 1) {
      props.score(750);
    } else if (failTry === 2) {
      props.score(500);
    } else {
      props.score(250);
    }
  };

  const handleQBtn = (isCorrect, index) => {
    if (isCorrect) {
      console.log("bomba");
      addPoints();
    } else {
      console.log("fml");
      setFailTry(failTry + 1);
    }

    const newClickedAnswers = [...clickedAnswers];
    newClickedAnswers[index] = true;

    setClickedAnswers(newClickedAnswers);
    console.log(clickedAnswers);
  };

  return (
    <>
      <div className="bubbleWrapper">
        <div className="otherBubble other">{otazka}</div>
      </div>

      <img className="logo-chat" src={logo}></img>

      <div className="questionOptions">
        {moznosti.map((moznost, index) => (
          <button
            className={
              clickedAnswers[index] === true
                ? "questionBtn--fail"
                : "questionBtn"
            }
            onClick={() => handleQBtn(moznost.isCorrect, index)}
            key={moznost.answerText}
          >
            {moznost.answerText}
          </button>
        ))}
      </div>

      <div className="timer">
        <p>
          Time elapsed: <span>{props.hours}</span>:<span>{props.minutes}</span>:
          <span>{props.seconds}</span>
        </p>
      </div>
    </>
  );
};

export default Question;
