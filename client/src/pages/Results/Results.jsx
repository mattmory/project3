import React from "react";
import "./Results.css";
import API from "../../utils/API";
import Typeahead from "../../components/Typeahead";
import ResultsTab from "../../components/ResultsTab";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: this.props.ingredients,
      canMake: this.props.canMake,
      almostMake: this.props.almostMake,
    };
    this.ingredientCB = this.ingredientCB.bind(this);
  }

  // Callback to get ingredients from typeahead and store in state
  ingredientCB(selectValue) {
    var ingId;
    var ingArray = selectValue;
    var canMake = [];
    var almostMake = [];

    // Construct query based on length of ids array
    if (ingArray.length === 1) {
      ingId = ingArray.map((ing) => {
        return ing.value;
      });
    } else if (ingArray.length > 1) {
      ingId = ingArray.map((ing) => {
        return ing.value;
      }).join("&");
    } else {
      // Empty displays
      this.setState({ ingredients: selectValue, canMake: canMake, almostMake: almostMake });
    }

    // API call to get drinks by ingredient id
    API.getDrinksByIngs(ingId)
      .then((res) => {
        if (res) {
          res.data.drinks.forEach((drink) => {
            // Return drinks user can make
            if (drink.missingIngCount === 0) {
              canMake.push(drink);
            } else if (drink.missingIngCount < 5 && drink.missingIngCount > 0) {
              // Return drinks user can almost make
              almostMake.push(drink);
            }
          });
          // Sort Drink Arrays
          // canMake -> Alpha by Name
          // almostMake -> missingIngCount then Alpha Name
          canMake.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
          almostMake.sort(function (a, b) {
            return a.missingIngCount -
              b.missingIngCount || a.name.localeCompare(b.name);
          });
          this.setState({ ingredients: selectValue, canMake: canMake, almostMake: almostMake });
        } else {
          console.log("no results found");
        }
      });
  }

  render() {
    return (
      <div className="resultsPage">
        <div className="row resultsTypeahead justify-content-center">
          <div className="col-12">
            <Typeahead ingredientCB={this.ingredientCB} ingredients={this.props.ingredients} />
          </div>
        </div>
        <ResultsTab {...this.props} canMake={this.state.canMake} almostMake={this.state.almostMake}
          userId={this.props.userId} isAuthenticated={this.props.isAuthenticated} />
      </div>
    );
  }
}

export default Results;