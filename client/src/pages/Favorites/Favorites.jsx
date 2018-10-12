import React from "react";
import { Redirect } from "react-router-dom";
// Redux
import { connect } from "react-redux";

import API from "../../utils/API";
import "./Favorites.css";
import Card from "../../components/Card/";

class Favorites extends React.Component {
  state = {
    topFaves: []
  };

  componentDidMount() {
    this.loadTopFavorites();
  }

  loadTopFavorites = () => {
    API.getAllFavorites()
      .then(res => {
        this.setState({ topFaves: [], topFaves: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    // if(!this.props.faves.length) {
    //   this.loadTopFavorites();
    // }
    if (!this.props.isAuth) {
      return <Redirect to="/" />;
    }
    return (
      <div className="favorites-container container">
        {this.props.faves.length ? (
          <div className="row">
            {this.props.faves.map(Fav => (
              <Card key={Fav.drink_id}
                drinkId={Fav.drink_id}
                fromFaves={true}
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
                  fromFaves={false}
                />
              ))}
            </div>
          </div>)}
      </div>
    );
  }


}



const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    faves: state.favs.faves
  };
};

export default connect(mapStateToProps, null)(Favorites);