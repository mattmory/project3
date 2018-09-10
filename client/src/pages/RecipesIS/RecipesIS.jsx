import React from "react";
import API from "../../utils/API";
import "./RecipesIS.css";
import Card from "../../components/Card";

class RecipesIS extends React.Component {
  constructor(props) {
    super(props);
    this.allRecipies = [];
    this.state = {
      recipeIds: [],
      isLoading: true,
      hasMore: true,
      loadError: false
    };
    this.getRecipes = this.getRecipes.bind(this);
    this.loadMoreRecipes = this.loadMoreRecipes.bind(this);

    window.onscroll = () => {
      const {
        state: {
          loadError,
          isLoading,
          hasMore,
        },
      } = this;

      //  if (loadError || isLoading || !hasMore) {return;}
      //Stop early if all have been loaded
      if (!hasMore) { return; }
      // Test to see if user is at the bottom.
      if (
        (window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        console.log("At Bottom");
        this.loadMoreRecipes();
      }
    };
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    API.getAllDrinks()
      .then(res => {
        this.allRecipies = res.data;
        this.loadMoreRecipes();
      })
      .catch(err => {
        this.setState({ loadError: true });
        console.log(err);
      });
  }

  getNextRecipies() {
    let nextRec = [];
    let nextCount = 9;
    if (this.allRecipies.length < 9) {
      nextCount = this.allRecipies.length;
    }
    for (let i = 0; i < nextCount; i++) {
      nextRec[i] = this.allRecipies[0];
      this.allRecipies.shift();
    }
    return nextRec;
  }

  loadMoreRecipes = () => {
    this.setState({ isLoading: true }, () => {
      let nextRec = this.getNextRecipies();
      this.setState({
        hasMore: (this.allRecipies.length > 1),
        isLoading: false,
        recipeIds: [
          ...this.state.recipeIds,
          ...nextRec]
      });
    });
  };

  render() {
    return (
      <div className="container recipe-container">
        <div className="row">
          {this.state.recipeIds.map(drink => (
            <Card key={drink.id}
              drinkId={drink.id}
              userId={this.props.userId}
              isAuthenticated={this.props.isAuthenticated}
              fromFaves={false}
            />
          ))}
        </div>
      </div>
    );
  }
}


export default RecipesIS;