import React from "react";
import "./Card.css";
import API from "../../utils/API";
import DrinkIcon from "../DrinkIcon";


class CardMissing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkData: null,
    };
  }

  componentDidMount() {
    //  this.formatMissing();
    this.loadDrink();
  }

  formatMissing = (missingIng) => {
    missingIng.sort();
    if (missingIng.length === 1) {
      return "Missing Ingredient: " + missingIng[0] + ".";
    }
    if (missingIng.length === 2) {
      return "Missing Ingredients: " + missingIng[0] + " and " + missingIng[1] + ".";
    }
    let missingString = "Missing Ingredients: ";
    for (let i = 0; i < missingIng.length - 1; i++) {
      missingString += missingIng[i] + ", ";
    }
    missingString = missingString.substr(0, missingString.length - 2);
    missingString += " and " + missingIng[missingIng.length - 1] + ".";
    return missingString;
  }


  loadDrink = () => {
    let missingString = this.formatMissing(this.props.missingIng);
    API.getDrinkById(this.props.drinkId).then(res => {
      this.setState({ drinkData: res.data, missingString: missingString });
    }).catch(err => console.log(err));
  };

  updateFavorite = () => {
    // Check to see if the user is authed.. if no, do nothing.
    if (this.props.isAuthenticated) {
      // Check to see if the action was from the favorite page, if so, delete the fav.
      if (this.props.fromFaves) {
        API.deleteFavorite(this.props.userId, this.state.drinkData.drinkID)
          .then(() => {
            this.props.updateFaves();
          });
      } else {
        // If the action no from favorites, add a favorite
        API.addFavorite(this.props.userId, this.state.drinkData.drinkID)
          .then(() => {
            this.props.updateFaves();
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
                <span>{this.state.missingString}</span><hr />
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

export default CardMissing;