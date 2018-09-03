import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;