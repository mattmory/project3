import React from "react";
import "./Favorites.css";

import { Redirect } from "react-router-dom";
import API from "../../utils/API";

import Card from "../../components/Card/";
import { Row, Col, Container } from "../../components/Grid"


class Favorites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      isAuthenticated: props.isAuthenticated,
      userFaves: []
    };
  }

  componentDidMount() {
    this.loadFavorites();
  }

  loadFavorites = () => {
    API.getUsersFavorites(this.state.userId)
      .then(res => {
        this.setState({ userFaves: res.data });
      })
      .catch(err => console.log(err));
  };


  render() {
    if (!this.state.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        {this.state.userFaves.length ? (
          <Row>
            {this.state.userFaves.map(Fav => (
              <Card key={Fav.drink_id}
                drinkId={Fav.drink_id}
              />
            ))}
          </Row>
        ) : (
            <span>You have no favorites.. get drinking!</span>
          )}
      </Container>
    );
  }
}

export default Favorites;