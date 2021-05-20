import React from "react";
import logo from "./transparent-logo--with-smile.png";
import "./style.css";

const About = () => {
  return (
    <>
      <h2 className="heading">ABOUT US</h2>
      <img src={logo}></img>
      <p className="paragraph">
        We are 2 sports enthusiasts who can’t stand still, we share the same
        temper as well as passion for physical activity and that is why we
        created this game 😊 We hope you enjoy it as much as we did while
        creating it!
      </p>
    </>
  );
};
export default About;
