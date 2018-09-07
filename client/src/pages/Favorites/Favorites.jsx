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
      userFaves: [],
      topFaves: []
    };
  }

  componentDidMount() {
    this.loadUserFavorites();
  }


  //API.getAllFavorites

  loadUserFavorites = () => {
    API.getUsersFavorites(this.state.userId)
      .then(res => {
        if (res.data.length > 0) {
          this.setState({ userFaves: res.data });
        }
        else {
          this.loadTopFavorites();
        }
      })
      .catch(err => console.log(err));
  };

  loadTopFavorites = () => {
    console.log("Now Here");
    API.getAllFavorites()
      .then(res => {
        this.setState({ topFaves: res.data });
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
                userId={this.state.userId}
                isAuthenticated={this.state.isAuthenticated}
                fromFaves={true}
              />
            ))}
          </Row>
        ) : (
          <div>
             <span>You have no favorites but here are our most favorited drinks for you to try.</span>
            <Row>
               {this.state.topFaves.map(Fav => (
                <Card key={Fav.drink_id}
                  drinkId={Fav.drink_id}
                  userId={this.state.userId}
                  isAuthenticated={this.state.isAuthenticated}
                  fromFaves={true}
                />
              ))}
            </Row>
            </div>)}
      </Container>
    );
  }
}

export default Favorites;