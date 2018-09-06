import React from "react";
import "./Style.css";
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

// export const RecipeListItem = props => (
//     <li className="list-group-item">
//       <Container>
//         <Row>
//           <Col size="xs-4 sm-2">
//             <Thumbnail src={props.thumbnail || "https://placehold.it/300x300"} />
//           </Col>
//           <Col size="xs-8 sm-9">
//             <h3>{props.title}</h3>
//             <p>Ingredients: {props.ingredients}</p>
//             <a rel="noreferrer noopener" target="_blank" href={props.href}>
//               Go to recipe!
//             </a>
//           </Col>
//         </Row>
//       </Container>
//     </li>
//   );
