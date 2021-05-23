import React from "react";
import logo from "./transparent-logo--with-smile.png";
import "./style.css";

const About = () => {
  return (
    <>
      <h2 className="heading">ABOUT PROJECT</h2>
      <img className="logo-about" src={logo}></img>
      <p className="paragraph-about">
        Geocache in Stromovka is a project which was created in order to
        successfully complete 3 months Certification Program - Web Development
        Czechitas Course.
      </p>
    </>
  );
};
export default About;
