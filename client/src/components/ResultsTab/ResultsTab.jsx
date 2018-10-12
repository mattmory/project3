import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// Redux
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/";


import "./ResultsTab.css";
import API from "../../utils/API";
import Card from "../../components/Card/";
import CardMissing from "../../components/CardMissing/";
import { Row, Col, Container } from "../../components/Grid";

class ResultsTab extends React.Component {
  constructor(props) {
    super(props);
    let startState = (this.props.canMake.length > 0);
    this.state = {
      ready: startState,
      modal: !startState
    };
    this.toggleReady = this.toggleReady.bind(this);
    this.getCanMake = this.getCanMake.bind(this);
    this.getAlmostMake = this.getAlmostMake.bind(this);
  }

  toggleReady(event) {
    if (event.target.className !== "active") {
      this.setState({ ready: !this.state.ready });
    }
  }

  getCanMake() {
    return this.props.canMake.map(drink => {
      return (<Card key={drink.id}
        drinkId={drink.id}
        fromFaves={this.props.faves.map(fav => fav.drink_id).includes(drink.id)}
      />);
    });
  }

  getAlmostMake() {
    return this.props.almostMake.map(drink => (
      <CardMissing key={drink.id}
        drinkId={drink.id}
        fromFaves={this.props.faves.map(fav => fav.drink_id).includes(drink.id)}
        missingIng={drink.missingIng}
      />
    ));
  }


  closeModal = () => {
    this.setState({
      modal: false,
    });
  }

  render() {
    let readyClassNames = this.state.ready ? "col-6 ready active" : "col-6 ready";
    let almostClassNames = this.state.ready ? "col-6 almost" : "col-6 almost active";
    return (
      <div>
        <div className="container">
          <div className="row resultsTabs">
            <div className={readyClassNames} onClick={this.toggleReady}>
              <h2 className={this.state.ready ? "active" : ""}>Ready to enjoy</h2>
            </div>
            <div className={almostClassNames} onClick={this.toggleReady}>
              <h2 className={this.state.ready ? "" : "active"}>Almost there</h2>
            </div>
          </div>
          <div className="row">
            {this.state.ready ? this.getCanMake() : this.getAlmostMake()}
          </div>
        </div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader><span className="logo"><b>cocktail</b>creator</span></ModalHeader>
          <ModalBody>
            <span className="modalText">Almost there. Add a few more ingredients and check <i>Ready to enjoy</i>.</span>
          </ModalBody>
          <ModalFooter>
            <button onClick={this.closeModal} class="button float-right">Ok</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    faves: state.favs.faves
  };
};

export default connect(mapStateToProps, null)(ResultsTab);