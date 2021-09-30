import React, { useState, useRef } from "react";
import { AppContext } from "./lib/contextLib";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Navigation, Footer, Home, Confirm} from "./components";
import './App.css';

function App() {
  localStorage.clear()
  localStorage.setItem("number", "0")
  localStorage.setItem("parrains", "")
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (
    <div className="App">
      <Router>
        <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <AppContext.Provider
                value={{ isAuthenticated, userHasAuthenticated }}>
              <Route path="/confirm" exact component={() => <Confirm />}
              /></AppContext.Provider>
          </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
