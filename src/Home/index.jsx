import React from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../LocalStorage";
import logo from "../img/logo-home.png";
import "./style.css";

const Home = ({ enable, helloUsername, username, currentQuestionIndex }) => {
  const [values, setValues] = useLocalStorage("username", "");

  const handleUsernameSubmit = () => {
    enable();
    helloUsername(values);
  };

  const handleUsernameInput = (e) => {
    setValues(e.target.value);
  };

  return (
    <>
      <h2 className="heading">GEOCACHING</h2>
      <h3 className="subheading">in Stromovka</h3>
      <img className="logo-username" src={logo}></img>
      <p className="paragraph-home">
        Discover Stromovka park through our Geocache quizzes. Please read the
        rules first and make sure to allow access to your GPS location.
      </p>
      <form className="username-form">
        <input
          onBlur={() => window.scrollTo(0, 0)}
          className={username !== "" ? "element-hidden" : "username-input"}
          value={values}
          onChange={handleUsernameInput}
          type="text"
          placeholder="Username"
        />

        <Link style={{ textDecoration: "none" }} to="/map">
          {values.length < 2 ? (
            <button className="btn-disabled" disabled>
              Create your username
            </button>
          ) : (
            <button onClick={handleUsernameSubmit} className="btn-username">
              {currentQuestionIndex === 0 ? "Start Game" : "Back to Game"}
            </button>
          )}
        </Link>
      </form>
    </>
  );
};
export default Home;
