import React from "react";
import "./Recipes.css";
import Nav from "../../components/Nav";
import Card from "../../components/Card";

class Recipes extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Card />
      </div>
    );
  }
}

export default Recipes;
