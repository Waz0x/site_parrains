import React, { useState, useRef } from "react";
import { AppContext } from "./lib/contextLib";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Navigation, Footer, Home, Admin} from "./components";
import './App.css';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (
    <div className="App">
      <Router>
        <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <AppContext.Provider
                value={{ isAuthenticated, userHasAuthenticated }}>
              <Route path="/admin" exact component={() => <Admin />}
              /></AppContext.Provider>
          </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
