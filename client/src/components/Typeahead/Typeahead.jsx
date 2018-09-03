import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import React from "react";
import VirtualizedSelect from "react-virtualized-select";

import "./Typeahead.css";
import API from "../../utils/API";

class Typeahead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
    };

    this.getIngredients = this.getIngredients.bind(this);

  }

  componentDidMount() {
    this.getIngredients();
  }

  async getIngredients() {
    const ingredients = await API.getIngredients();
    console.log(ingredients);
    this.setState({ options: ingredients });
  }

  render() {
    let ingredientOptions = [];
    if (this.state.options.data) {
      ingredientOptions = this.state.options.data.map((ingredient) => {
        let ingObj = {
          label: ingredient.name,
          value: ingredient.id
        };
        return ingObj;
      });
    }
    console.log(this.state.options);
    return (
      <VirtualizedSelect
        options={ingredientOptions}
        onChange={(selectValue) => this.setState({ selectValue })}
        value={this.state.selectValue}
      />
    );
  }

}

export default Typeahead;