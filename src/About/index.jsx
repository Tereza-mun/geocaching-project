import React from "react";
import logo from "../img/logo-about.png";
import "./style.css";

const About = () => {
  return (
    <>
      <h2 className="heading">ABOUT PROJECT</h2>
      <img className="logo-about" src={logo}></img>
      <p className="paragraph-about">
        Geocaching was built as a final project for the successful completion of
        the 3-months Web Development course in
        <br />
        <a href="https://www.czechitas.cz/cs/">
          Digital Academy with Czechitas
        </a>
      </p>
    </>
  );
};
export default About;
