import React from "react";
import "./Card.css";
import { Container, Row, Col } from "../Grid";
import API from "../../utils/API";


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
      <div>
        {this.state.drinkData !== null ? (
          <div className="card">
            <div className="img-container">
              <img alt={this.state.drinkData.drinkName} src={this.state.drinkData.thumbImg} />
            </div>
            <div className="content">
              <h4>{this.state.drinkData.drinkName}</h4>
              {this.state.drinkData.instructions}
              {this.state.drinkData.contents.map(Ing => (
                <span><h6>{Ing.ingredientName}: {Ing.ingredientAmount}</h6></span>
              ))}
            </div>
          </div>
        ) :
          (<span></span>)}
      </div>
    );
  }
}


export default Card;

// onClick={() => this.props.setClicked(this.props.drink_id
