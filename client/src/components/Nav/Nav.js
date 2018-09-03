import React from "react";

const Nav = () => (
<div id="navLinks">
  <nav className="container-fluid navbar navbar-expand-lg row">
    <section className="col-sm-2">
      <a className="navbar-brand" id="logo" href="/">  </a>
        <img src="/src/images/logo.png" alt="Placeholder"></img>
    </section>
    <section className="col-sm-6 navbar ">
          <li className="nav-link">
                        <a href="Ingredients.html " className="active "  role="button " data-toggle="button">Bio</a></li>
          <li className="nav-link ">
                        <a href="Recipes.html "  role="button" data-toggle="button">Recipes</a></li>
          <li className="nav-link ">
                        <a href="Goodtimes.html " role="button" data-toggle="button">Goodtimes</a></li>
      </section>
      <ul className="navbar-nav mr-auto"></ul>
      <section className="col-sm-2">
        Saved Drinks
      </section>
  </nav>
</div>


  
);

export default Nav;
