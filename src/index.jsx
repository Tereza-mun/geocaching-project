import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { render } from "react-dom";
import About from "./About";
import Rules from "./Rules";
import Home from "./Home";
import Map from "./Map";
import Question from "./Question";
import Congratulations from "./Congratulations";
import { pinpoints } from "./Map/pinpoints";
import Popup from "reactjs-popup";
import ReactNoSleep from "react-no-sleep";
import "./style.css";
import { useLocalStorage } from "./LocalStorage";
import imageAbout from "./img/logo-about.png";
import imageHome from "./img/logo-home.png";
import imageTrophy from "./img/trophy.png";

const App = () => {
  const [username, setUsername] = useLocalStorage("name", "");

  const history = useHistory();

  const handleHello = (name) => {
    setUsername(name);
  };

  useEffect(() => {
    const pictures = [imageAbout, imageHome, imageTrophy];
    pictures.forEach((picture) => {
      const img = new Image();
      img.src = picture;
      window[picture] = img;
    });
  }, []);

  const [seconds, setSeconds] = useLocalStorage("secs", 0);
  const [minutes, setMinutes] = useLocalStorage("mins", 0);
  const [hours, setHours] = useLocalStorage("hrs", 0);

  const [isActive, setIsActive] = useLocalStorage("active", false);

  const start = () => {
    setIsActive(true);
  };

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsActive(false);
  };

  const stop = () => {
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
      if (seconds === 60) {
        setMinutes(minutes + 1);
        setSeconds(0);
        if (minutes === 60) {
          setHours(hours + 1);
          setSeconds(0);
          setMinutes(0);
        }
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useLocalStorage(
    "questionIndex",
    0,
  );

  const currentQuestion = pinpoints[currentQuestionIndex];

  const [score, setScore] = useLocalStorage("currentScore", 0);

  const [userLocation, setUserLocation] = useState();

  const handleCorrect = (pointsAdded) => {
    setScore(score + pointsAdded);

    if (currentQuestionIndex + 1 >= pinpoints.length) {
      stop();
      history.push("/congratulations");
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleExit = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    reset();
  };

  return (
    <ReactNoSleep>
      {({ enable }) => (
        <div className="container">
          <nav className="nav">
            <ul className="nav-ul">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Popup
                  modal={true}
                  trigger={<button className="btn--rules"> Rules</button>}
                  overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                  closeOnDocumentClick={true}
                >
                  {(close) => (
                    <div className="rules">
                      <p>
                        {" "}
                        &#8226; There are 9 checkpoints, each holding a
                        question, which can be revealed when you get close to
                        them.
                      </p>
                      <p>
                        &#8226; Answering correctly on first try will earn you
                        1000 points, on second try 750 points, third is worth
                        500 points and fourth 250 points.
                      </p>
                      <p>
                        &#8226; Next location is revelead after answering the
                        current question.
                      </p>

                      <p>
                        &#8226; The goal is to earn max possible points and to
                        have fun!
                      </p>
                      <button
                        className="btn--close"
                        onClick={() => {
                          close();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </Popup>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/">
              <Home
                helloUsername={handleHello}
                enable={enable}
                username={username}
                currentQuestionIndex={currentQuestionIndex}
              />
            </Route>
            <Route exact path="/map">
              <Map
                key={currentQuestion.latitude}
                userLocation={userLocation}
                setUserLocation={setUserLocation}
                currentQuestion={currentQuestion}
                username={username}
                scoreCounter={score}
                score={handleCorrect}
                hours={String(hours).padStart(2, "0")}
                minutes={String(minutes).padStart(2, "0")}
                seconds={String(seconds).padStart(2, "0")}
                start={start}
              />
            </Route>
            <Route exact path="/congratulations">
              <Congratulations
                onLeave={handleExit}
                username={username}
                scoreCounter={score}
                hours={String(hours).padStart(2, "0")}
                minutes={String(minutes).padStart(2, "0")}
                seconds={String(seconds).padStart(2, "0")}
              />
            </Route>
          </Switch>
        </div>
      )}
    </ReactNoSleep>
  );
};

render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#app"),
);
