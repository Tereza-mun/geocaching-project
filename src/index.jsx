import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import Home from './Home';
import About from './About';
import Rules from './Rules';
import Username from './Username';
import Welcome from './Welcome';
import Essentials from './Essentials';
import Map00 from './Map00';
import Question from './Question';
import Congrat from './Congrat';
import { pinpoints } from './Map00/pinpoints';

import './style.css';

const App = () => {
  const [username, setUsername] = useState('');

  const handleHello = (name) => {
    setUsername(name);
  };

  return (
    <Router>
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
              <Link to="/rules">Rules</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/rules">
            <Rules />
          </Route>
          <Route exact path="/username">
            <Username helloUsername={handleHello} />
          </Route>
          <Route exact path="/welcome">
            <Welcome usernameW={username} />
          </Route>
          <Route exact path="/essentials">
            <Essentials />
          </Route>
          <Route exact path="/map00">
            <Map00 currentQuestion={pinpoints[0]} />
          </Route>
          <Route exact path="/question">
            <Question />
          </Route>
          <Route exact path="/congratulation">
            <Congrat usernameW={username} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

render(<App />, document.querySelector('#app'));
