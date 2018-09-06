import React from "react";
import "./Favorites.css";

import { Redirect } from "react-router-dom";
import API from "../../utils/API";


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
      <div className="container-fluid">
        <div><span>Favorites Page</span></div>
        {this.state.userFaves.length ? (
          <ul>
            {this.state.userFaves.map(Fav => (
              <li key={Fav.drink_id}>
                {Fav.drink_id}
              </li>
            ))}
          </ul>
        ) : (
            <span>You have no favorites.. get drinking!</span>
          )}
      </div>
    );
  }
}

export default Favorites;