import React, { useState } from "react";
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
import "./style.css";

const App = () => {
  const [username, setUsername] = useState("Mon");

  const history = useHistory();

  const handleHello = (name) => {
    setUsername(name);
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = pinpoints[currentQuestionIndex];
  const [score, setScore] = useState(0);

  const handleCorrect = (pointsAdded) => {
    setScore(score + pointsAdded);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    history.push("/map00");
  };

  return (
    <>
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
              >
                {(close) => (
                  <div className="rules">
                    <p> &#8226; Starting position: 50.1047600N, 14.4313575E</p>
                    <p>
                      &#8226; There are 8 checkpoints, questions are related to
                      the location you are at.
                    </p>
                    <p>
                      &#8226; Once you get to the location, your GPS will
                      validate it and the question will be revealed.
                    </p>

                    <p>
                      &#8226; After answering the question next location will be
                      unlocked.
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
          {/* <Route exact path="/rules">
            <Rules />
          </Route> */}
          <Route exact path="/">
            <Username helloUsername={handleHello} />
          </Route>
          <Route exact path="/map00">
            <Map00
              currentQuestion={currentQuestion}
              usernameW={username}
              scoreCounter={score}
            />
          </Route>
          <Route exact path="/question">
            <Question currentQuestion={currentQuestion} score={handleCorrect} />
          </Route>
          <Route exact path="/congratulation">
            <Congrat usernameW={username} />
          </Route>
        </Switch>
      </div>
    </>
  );
};

render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#app"),
);
