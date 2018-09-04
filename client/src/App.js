import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Account from "./pages/Account";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path="/account" component={Account} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;