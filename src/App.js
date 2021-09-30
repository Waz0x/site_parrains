import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Navigation, Footer, Home, Confirm} from "./components";
import './App.css';

function App() {
  localStorage.clear()
  localStorage.setItem("number", "0")
  localStorage.setItem("parrains", "")
  return (
    <div className="App">
      <Router>
        <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/confirm" exact component={() => <Confirm />} />
          </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
