import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Recipes from "./pages/Recipes";
import Nav from "./components/Nav";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isAuthenticated: false,
    };
    this.authCB = this.authCB.bind(this);
  }

  authCB(email, isAuthenticated, id) {
    this.setState({
      email:email,
      isAuthenticated:isAuthenticated,
      id: id,
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav email={this.state.email} isAuthenticated={this.state.isAuthenticated} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact path="/account"
              render={props => <Account authCB={this.authCB} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;