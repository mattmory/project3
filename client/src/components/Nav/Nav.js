import React from "react";

const Nav = () => (
<div id="navLinks">
  <nav className="container-fluid navbar navbar-expand-lg row">
    <section className="col-sm-2">
      <a className="navbar-brand" id="logo" href="/">  </a>
      <h1 id="logo">Cocktail Creator</h1>
    </section>
    <section className="col-sm-4 navbar ">
          <li className="nav-link">
                        <a href="Ingredients.html " className="active "  role="button " data-toggle="button">Ingredients</a></li>
          <li className="nav-link ">
                        <a href="Recipes.html "  role="button" data-toggle="button">Recipes</a></li>
          <li className="nav-link ">
                        <a href="Goodtimes.html " role="button" data-toggle="button">Favorites</a></li>
      </section>
      <ul className="navbar-nav mr-auto"></ul>
      <section className="col-sm-2">
        Saved Drinks
      </section>
  </nav>
</div>


  
);

export default Nav;
