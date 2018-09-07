import React from "react";
import API from "../../utils/API";
import "./Recipes.css";
import Card from "../../components/Card/";

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getRecipes = this.getRecipes.bind(this);
  }

  getRecipes() {
    API.getAllDrinks()
      .then(res => {
        res.data.forEach((drink) => {

          console.log(drink.id, drink.name);

        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.getRecipes()}
        </div>
      </div>
    );
  }
}

export default Recipes;