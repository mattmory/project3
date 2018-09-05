import React from "react";
import "./Welcome.css";
import Typeahead from "../Typeahead";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
    };
    this.ingredientCB = this.ingredientCB.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  // Callback to get ingredients from typeahead and store in state
  ingredientCB(selectValue) {
    this.setState({ingredients: selectValue});
  }

  // Search drinks
  handleSearch(event) {
    event.preventDefault();
    console.log(this.state.ingredients);
    // TODO: make api call
  }

  render() {
    return (
      <div className="row typeaheadDiv">
        <div className="col-6">
          <h1>Welcome! Let's get started.</h1>
          <h3>Find recipes by letting us know which ingredients you have on hand.</h3>
          <div className="welcome-typeahead">
            <Typeahead ingredientCB={this.ingredientCB}/>
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