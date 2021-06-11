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
import Username from "./Username";
import Map00 from "./Map00";
import Question from "./Question";
import Congrat from "./Congrat";
import { pinpoints } from "./Map00/pinpoints";
import Popup from "reactjs-popup";
import { useStopwatch } from "react-timer-hook";
import ReactNoSleep from "react-no-sleep";
import "./style.css";
import { useLocalStorage } from "./LocalStorage";

const App = () => {
  const [username, setUsername] = useLocalStorage("name", "");

  const history = useHistory();

  const handleHello = (name) => {
    setUsername(name);
  };

  // const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
  //   autoStart: false,
  // });

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

  const handleCorrect = (pointsAdded) => {
    setScore(score + pointsAdded);

    if (currentQuestionIndex + 1 >= pinpoints.length) {
      stop();
      history.push("/congratulation");
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    history.push("/map00");
    scrollTo();
  };

  const handleExit = () => {
    console.log("Exit works");
    setScore(0);
    setCurrentQuestionIndex(0);
    reset();
    // pause();
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
                        &#8226; There are 8 checkpoints, each holding a
                        question, which can be revealed when you get close to
                        them.
                      </p>
                      <p>
                        &#8226; Answering correctly on first try will bring you
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
                        x
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
              <Username
                helloUsername={handleHello}
                enable={enable}
                scrollTo={handleCorrect}
              />
            </Route>
            <Route exact path="/map00">
              <Map00
                currentQuestion={currentQuestion}
                usernameW={username}
                scoreCounter={score}
                score={handleCorrect}
                hours={String(hours).padStart(2, "0")}
                minutes={String(minutes).padStart(2, "0")}
                seconds={String(seconds).padStart(2, "0")}
                start={start}
              />
            </Route>
            {/* <Route exact path="/question">
              <Question
                currentQuestion={currentQuestion}
                score={handleCorrect}
              />
            </Route> */}
            <Route exact path="/congratulation">
              <Congrat
                onLeave={handleExit}
                usernameW={username}
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
