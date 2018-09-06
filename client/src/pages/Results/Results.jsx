import React from "react";
import "./Results.css";
import Typeahead from "../../components/Typeahead";
import ResultsTab from "../../components/ResultsTab";

class Results extends React.Component {

  render() {
    return (
      <div className="resultsPage">
        <div className="row resultsTypeahead justify-content-center">
          <div className="col-xs-12 col-md-8 col-lg-9">
            <Typeahead ingredientCB={this.ingredientCB} />
          </div>
          <button type="button" className="button col-xs-12 col-md-4 col-lg-3" onClick={this.handleSearch}>
            Search Recipes
          </button>
        </div>
        <ResultsTab />
      </div>
    );
  }
}

export default Results;