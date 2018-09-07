import React from "react";
import "./ResultsTab.css";

import API from "../../utils/API";
import Card from "../../components/Card/";
import { Row, Col, Container } from "../../components/Grid";

class ResultsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true,
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
    return this.props.canMake.map(drink => (
      <Card key={drink.id}
        drinkId={drink.id}
      />
    ));
  }

  getAlmostMake() {
    return this.props.almostMake.map(drink => (
      <Card key={drink.id}
        drinkId={drink.id}
      />
    ));
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
      </div>
    );
  }
}

export default ResultsTab;