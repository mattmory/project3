import React from "react";
import "./Results.css";
import API from "../../utils/API";
import Typeahead from "../../components/Typeahead";

class Results extends React.Component {

  render() {
    return (
      <div className="row typeaheadDiv">
        <div className="col-10">
          <Typeahead ingredientCB={this.ingredientCB} />
        </div>
        <button type="button" className="button" onClick={this.handleSearch}>
          Search Recipes
        </button>
      </div>
    );
  }
}

export default Results;