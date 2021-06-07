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

const App = () => {
  const [username, setUsername] = useState("");

  const history = useHistory();

  const handleHello = (name) => {
    setUsername(name);
  };

  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = pinpoints[currentQuestionIndex];
  const [score, setScore] = useState(0);

  const handleCorrect = (pointsAdded) => {
    setScore(score + pointsAdded);

    if (currentQuestionIndex + 1 >= pinpoints.length) {
      pause();
      history.push("/congratulation");
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    history.push("/map00");
  };

  const handleExit = () => {
    console.log("Works fine");
    setScore(0);
    setCurrentQuestionIndex(0);
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
                        &#8226; Starting position: 50.1047600N, 14.4313575E
                      </p>
                      <p>
                        &#8226; There are 8 checkpoints, questions are related
                        to the location you are at.
                      </p>
                      <p>
                        &#8226; Once you get to the location, your GPS will
                        validate it and the question will be revealed.
                      </p>

                      <p>
                        &#8226; After answering the question next location will
                        be unlocked.
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
              <Username helloUsername={handleHello} enable={enable} />
            </Route>
            <Route exact path="/map00">
              <Map00
                currentQuestion={currentQuestion}
                usernameW={username}
                scoreCounter={score}
                hours={String(hours).padStart(2, "0")}
                minutes={String(minutes).padStart(2, "0")}
                seconds={String(seconds).padStart(2, "0")}
                start={start}
                stop={pause}
              />
            </Route>
            <Route exact path="/question">
              <Question
                currentQuestion={currentQuestion}
                score={handleCorrect}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                start={start}
                stop={pause}
              />
            </Route>
            <Route exact path="/congratulation">
              <Congrat
                onLeave={handleExit}
                usernameW={username}
                scoreCounter={score}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
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
