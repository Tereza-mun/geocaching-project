import React from "react";
import logo from "../img/logo-about.png";
import { pinpoints } from "../Map00/pinpoints.js";
import "./style.css";

const Question = (props) => {
  console.log(props.currentQuestion);

  const otazka = props.currentQuestion.questionText;
  const moznosti = props.currentQuestion.answerOptions;

  const handleQBtn = (e) => {
    const malaka = e;
    console.log(malaka);
    if (malaka) {
      console.log("bomba");
      props.score();
    } else {
      console.log("fml");
    }
  };

  return (
    <>
      <div className="bubble-up">
        <div className="question-text">{otazka}</div>
      </div>
      {/* 
      <img style={{ width: "30%" }} className="logo-about" src={logo}></img> */}

      <div>
        {moznosti.map((moznost) => (
          <button
            onClick={() => handleQBtn(moznost.isCorrect)}
            key={moznost.answerText}
          >
            {moznost.answerText}
          </button>
        ))}
      </div>
    </>
  );
};

export default Question;
