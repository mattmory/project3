import React from "react";
import API from "../../utils/API";
import "./Recipes.css";
import Card from "../../components/Card";

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeIds: this.props.recipeIds,
    };
    this.getRecipes = this.getRecipes.bind(this);
  }

  getRecipes() {
    API.getAllDrinks()
      .then(res => {
        return res.data.map(drink => {
          <Card key={drink.id}
            drinkId={drink.id}
          />;
          console.log(drink);
        });
      });
  }

  render() {
    return (
      <div className="row">
        {this.getRecipes()}
      </div>
    );
  }
}
export default Recipes;