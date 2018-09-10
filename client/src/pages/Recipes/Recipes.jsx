import React from "react";
import API from "../../utils/API";
import "./Recipes.css";
import Card from "../../components/Card";

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeIds: [],
    };
    this.getRecipes = this.getRecipes.bind(this);
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    API.getAllDrinks()
      .then(res => {
        this.setState({ recipeIds: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="row recipe-container">
        {this.state.recipeIds.map(drink => (
          <Card key={drink.id}
            drinkId={drink.id}
            userId={this.state.userId}
            isAuthenticated={this.state.isAuthenticated}
            fromFaves={true}
          />
        ))}
      </div>
    );
  }
}
export default Recipes;