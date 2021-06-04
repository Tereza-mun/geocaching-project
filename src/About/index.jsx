import React from "react";
<<<<<<< HEAD
import logo from "../img/logo-about.png";
=======
import logo from "./transparent-logo--with-smile.png";
>>>>>>> 5a71fdf91422a86e6d87d22c13498c7f59f063fc
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
