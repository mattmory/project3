import React from "react";
// Redux
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";


import "./Card.css";
import API from "../../utils/API";
import DrinkIcon from "../DrinkIcon";


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkData: null,
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

  updateFavorite = () => {
    // Check to see if the user is authed.. if no, do nothing.
    if (this.props.isAuth) {
      // Check to see if the action was from the favorite page, if so, delete the fav.
      if (this.props.fromFaves) {
        API.deleteFavorite(this.props.userId, this.state.drinkData.drinkID)
          .then(() => {
            this.props.removeFavorite(this.props.userId, this.state.drinkData.drinkID);
          });
      } else {
        // If the action no from favorites, add a favorite
        API.addFavorite(this.props.userId, this.state.drinkData.drinkID)
          .then(() => {
            this.props.addFavorite(this.props.userId, this.state.drinkData.drinkID);
          });
      }
    }
  };

  render() {
    let favClassName = this.props.fromFaves ? "drink-icon-card float-right favorited" : "drink-icon-card float-right";
    return (
      this.state.drinkData !== null ? (
        <div className="col-sm-12 col-md-6 col-lg-4">
          <div className="card rounded">
            <img className="card-image-top rounded-top" alt={this.state.drinkData.drinkName} src={this.state.drinkData.thumbImg} />
            <div className="card-body">
              <h1 className="drinkName">{this.state.drinkData.drinkName}
                <span className={favClassName} onClick={() => this.updateFavorite(this.props.drinkId)}>
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



const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    faves: state.favs.faves
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (userId,drinkId) => { dispatch(actionCreators.addFavorite({userId: userId,drinkId: drinkId})) },
    removeFavorite: (userId,drinkId) => { dispatch(actionCreators.removeFavorite({userId: userId,drinkId: drinkId}))}
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Card);