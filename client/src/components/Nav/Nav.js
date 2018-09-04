import React from "react";
import "./Nav.css";

const Nav = () => (

  <nav className="container navbar navbar-expand-lg ">
    <section className="col-sm-5">
      <a className="navbar-brand" id="logo" href="/">  </a>
       
      <h1 id="logoTwo" > <b>Cocktail</b>Creator </h1>
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



  
);

export default Nav;
