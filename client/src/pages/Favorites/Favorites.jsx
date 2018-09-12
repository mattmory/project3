import React from "react";
import "./Favorites.css";

import { Redirect } from "react-router-dom";
import API from "../../utils/API";

import Card from "../../components/Card/";

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

  loadUserFavorites = () => {
    API.getUsersFavorites(this.state.userId)
      .then(res => {
        if (res.data.length > 0) {
          this.setState({ userFaves: res.data });
        } else {
          this.loadTopFavorites();
        }
      })
      .catch(err => console.log(err));
  };

  loadTopFavorites = () => {
    API.getAllFavorites()
      .then(res => {
        this.setState({ userFaves: [], topFaves: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    if (!this.state.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="favorites-container container">
        {this.state.userFaves.length ? (
          <div className="row">
            {this.state.userFaves.map(Fav => (
              <Card key={Fav.drink_id}
                drinkId={Fav.drink_id}
                userId={this.state.userId}
                isAuthenticated={this.state.isAuthenticated}
                fromFaves={true}
                updateFaves={() => this.loadUserFavorites()}
              />
            ))}
          </div>
        ) : (
          <div>
            <div className="nofavoritesdiv">You have no favorites but here are our most favorited drinks ordered by popularity for you to try.</div>
            <div className="row">
              {this.state.topFaves.map(Fav => (
                <Card key={Fav.drink_id}
                  drinkId={Fav.drink_id}
                  userId={this.state.userId}
                  isAuthenticated={this.state.isAuthenticated}
                  fromFaves={false}
                  updateFaves={() => this.loadUserFavorites()}
                />
              ))}
            </div>
          </div>)}
      </div>
    );
  }
}

export default Favorites;