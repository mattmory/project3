import React from "react";
import "./Card.css";
import { Container, Row, Col } from "../Grid";
import API from "../../utils/API";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card" onClick={() => props.setClicked(props.id)}>
        <div className="img-container">
          <img alt={props.name} src={props.image} />
        </div>
        <div className="content">
          {props.name}
          {props.ingredients}
          {props.summary}
        </div>
      </div>
    );
  }
}


export default Card;
