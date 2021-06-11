import React, { useState } from "react";
import logo from "../img/logo-chat.png";
import "./style.css";

const Question = ({ currentQuestion, score, isOpen }) => {
  console.log(currentQuestion);

  const otazka = currentQuestion.questionText;
  const moznosti = currentQuestion.answerOptions;

  const [failTry, setFailTry] = useState(0);

  const [clickedAnswers, setClickedAnswers] = useState([
    false,
    false,
    false,
    false,
  ]);

  const addPoints = () => {
    if (failTry === 0) {
      score(1000);
    } else if (failTry === 1) {
      score(750);
    } else if (failTry === 2) {
      score(500);
    } else {
      score(250);
    }
  };

  const handleQBtn = (isCorrect, index) => {
    const newClickedAnswers = [...clickedAnswers];
    newClickedAnswers[index] = true;

    setClickedAnswers(newClickedAnswers);
    console.log(clickedAnswers);
    if (isCorrect) {
      console.log("bomba");
      isOpen(false);
      addPoints();
      setClickedAnswers([false, false, false, false]);
    } else {
      console.log("fml");
      setFailTry(failTry + 1);
    }
  };

  return (
    <div className="question">
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

      {/* <div className="timer">
        <p>
          Time elapsed: <span>{props.hours}</span>:<span>{props.minutes}</span>:
          <span>{props.seconds}</span>
        </p>
      </div> */}
    </div>
  );
};

export default Question;
