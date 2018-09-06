import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Nav.css";
import DrinkIcon from "../DrinkIcon/DrinkIcon";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getLink = this.getLink.bind(this);
  }

  getLink() {
    if (this.props.isAuthenticated) {
      return <Link to="/favorites" className="nav-link">
        <span className="favorites">
          <span className="drink-icon-nav mr-1">
            <DrinkIcon />
          </span>
          Saved Drinks
        </span>
      </Link>;
    } else {
      return (
        <Link to="/account" className="nav-link nav-link-style">
          Login
        </Link>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" id="logo" to="/">
          <h1 id="logoTwo"> <b>cocktail</b>creator</h1>
        </Link>
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link nav-link-style" to="/">ingredients</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link nav-link-style" to="/browse">recipes</Link>
          </li>
        </ul>
        {this.getLink()}
      </nav>
    );
  }
}

export default Nav;
