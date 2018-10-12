import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  DropdownItem
} from 'reactstrap';

// Redux
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";


import "./Nav.css";
import DrinkIcon from "../DrinkIcon/DrinkIcon";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.getLink = this.getLink.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getLink() {
    if (this.props.isAuth) {
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
      <div>
        <Navbar color="faded" light expand="md" toggleNavKey={1}>
          <NavbarBrand>
            <Link to="/" className="logoLink">
              <span className="logo"><b>cocktail</b>creator</span>
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem>
                <Link className="nav-link nav-link-style" to="/">ingredients</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link nav-link-style" to="/recipes">recipes</Link>
              </NavItem>
            </Nav>
            <DropdownItem divider />
            {this.getLink()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, null)(Navigation);
