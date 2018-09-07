import React from "react";
import "./Card.css";
import API from "../../utils/API";
import DrinkIcon from "../DrinkIcon";


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkData: null
    };
  }

  componentDidMount() {
    this.loadDrink();
  }

  loadDrink = () => {
    API.getDrinkById(this.props.drinkId)
      .then(res => {
        this.setState({ drinkData: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      this.state.drinkData !== null ? (
        <div className="col-sm-12 col-md-6 col-lg-4">
          <div className="card rounded">
            <img className="card-image-top rounded-top" alt={this.state.drinkData.drinkName} src={this.state.drinkData.thumbImg} />
            <div className="card-body">
              <h1 className="drinkName">{this.state.drinkData.drinkName}
                <span className="drink-icon-card float-right">
                  <DrinkIcon />
                </span>
              </h1>
              <div className="card-text">
                {this.state.drinkData.contents.map(Ing => (
                  <div>{Ing.ingredientName}: {Ing.ingredientAmount}</div>
                ))}
                <p className="card-instructions">{this.state.drinkData.instructions}</p>
              </div>
            </div>
          </div>
        </div>
      ) :
        (<span></span>)
    );
  }
}

export default Card;

// onClick={() => this.props.setClicked(this.props.drink_id