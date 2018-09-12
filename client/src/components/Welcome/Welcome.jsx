import React from "react";
import { Redirect } from "react-router-dom";
import "./Welcome.css";
import API from "../../utils/API";
import Typeahead from "../Typeahead";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      canMake: [],
      almostMake: [],
      toResults: false,
    };
    this.ingredientCB = this.ingredientCB.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  // Callback to get ingredients from typeahead and store in state
  ingredientCB(selectValue) {
    this.setState({ ingredients: selectValue });
  }

  // Search drinks
  handleSearch(event) {
    event.preventDefault();

    var ingId;
    var ingArray = this.state.ingredients;
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
        } else {
          console.log("no results found");
        }
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
        this.props.searchCB(ingArray, canMake, almostMake);
        this.setState({ toResults: true, canMake: canMake, almostMake: almostMake });
      });
  }

  render() {
    if (this.state.toResults) {
      return <Redirect to="/results" />;
    }
    return (
      <div className="row typeaheadDiv">
        <div className="col-xs-12 col-md-5 pl-5">
          <h1>Welcome! Let's get started.</h1>
          <h3>Find recipes by letting us know which ingredients you have on hand.</h3>
          <div className="welcome-typeahead">
            <Typeahead ingredientCB={this.ingredientCB} />
          </div>
          <button type="button" className="button float-right" onClick={this.handleSearch}>
            Search Recipes
          </button>
        </div>
      </div>
    );
  }
}

export default Welcome;