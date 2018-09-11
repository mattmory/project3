import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Favorites from "./pages/Favorites";
import Results from "./pages/Results";
import Navigation from "./components/Nav";
import Recipes from "./pages/Recipes";
import RecipesIS from "./pages/RecipesIS";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isAuthenticated: false,
      id: "",
      ingredients: [],
      canMake: [],
      almostMake: [],
    };
    this.authCB = this.authCB.bind(this);
    this.searchCB = this.searchCB.bind(this);
  }

  authCB(email, isAuthenticated, id) {
    this.setState({
      email: email,
      isAuthenticated: isAuthenticated,
      id: id,
    });
  }

  searchCB(ingredients, canMake, almostMake) {
    this.setState({
      ingredients: ingredients,
      canMake: canMake,
      almostMake: almostMake,
    });
  }

  render() {
    return (
      <Router>
        <div id="routerDiv">
          <Navigation email={this.state.email} isAuthenticated={this.state.isAuthenticated} id={this.state.id} />
          <Switch>
            <Route exact path="/"
              render={props => <Home searchCB={this.searchCB} />}
            />
            <Route
              exact path="/account"
              render={props => <Account authCB={this.authCB} />}
            />
            <Route
              exact path="/favorites"
              render={props => <Favorites
                userId={this.state.id} isAuthenticated={this.state.isAuthenticated} />}
            />
            <Route exact path="/results"
              render={props => <Results
                almostMake={this.state.almostMake}
                canMake={this.state.canMake}
                ingredients={this.state.ingredients}
                isAuthenticated={this.state.isAuthenticated}
                userId={this.state.id}
              />}
            />
            {/* <Route exact path = "/recipes" component={Recipes} /> */}
            <Route
              exact path="/recipes"
              render={props => <RecipesIS
                isAuthenticated={this.state.isAuthenticated}
                userId={this.state.id}
              />}
            />
            <Route component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;