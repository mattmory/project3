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
      this.state.drinkData !== null ? (
        <div className="col-4">
          <div className="card rounded">
            <img className="card-image-top rounded-top" alt={this.state.drinkData.drinkName} src={this.state.drinkData.thumbImg} />
            <div className="content">
              <h1 className="drinkName">{this.state.drinkData.drinkName}</h1>
              {this.state.drinkData.contents.map(Ing => (
                <div>{Ing.ingredientName}: {Ing.ingredientAmount}</div>
              ))}
              {this.state.drinkData.instructions}
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
