import React from "react";
import "./Nav.css";

const Nav = () => (
<div id="navLinks">
  <nav className="container-fluid navbar navbar-expand-lg row">
    <section className="col-sm-4">
      <a className="navbar-brand" id="logo" href="/">  </a>
      <h1 id="logo"> Cocktail </h1> <h1 id="logoTwo">Creator </h1>
    </section>
    <section className="col-m-3 navbar center ">
          <li className="nav-link">
                        <a href="Ingredients.html " className="active "  role="button " data-toggle="button">ingredients</a></li>
          <li className="nav-link ">
                        <a href="Recipes.html "  role="button" data-toggle="button">recipes</a></li>
      </section>
      <ul className="navbar-nav mr-auto"></ul>
      <section className="col-sm-2">
        Saved Drinks
      </section>
  </nav>
</div>


  
);

export default Nav;
