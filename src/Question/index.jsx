import React from "react";
import logo from "../img/logo-about.png";
// import "./style.css";

const Question = () => {
  return (
    <>
      <img className="logo-about" src={logo}></img>
      <form className="question-choices">
        <input type="radio" id="question1" name="question1" value="5" />
        <label for="question1">5</label>
        <input type="radio" id="question1" name="question1" value="10" />
        <label for="question1">10</label>
      </form>
    </>
  );
};

export default Question;
