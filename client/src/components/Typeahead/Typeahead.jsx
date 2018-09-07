import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";
import "./Typeahead.css";

import API from "../../utils/API";
import React from "react";
import VirtualizedSelect from "react-virtualized-select";

class Typeahead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      selectValue: this.props.ingredients,
    };

    this.getIngredients = this.getIngredients.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.getIngredients();
  }

  async getIngredients() {
    const ingredients = await API.getIngredients();
    this.setState({ options: ingredients });
  }

  // Passing select value to parent Welcome component
  // then setting state
  handleOnChange (selectValue) {
    this.props.ingredientCB(selectValue);
    this.setState({ selectValue });
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
    return (
      <VirtualizedSelect
        multi={true}
        options={ingredientOptions}
        onChange={(selectValue) => this.handleOnChange(selectValue)}
        value={this.state.selectValue}
      />
    );
  }
}

export default Typeahead;