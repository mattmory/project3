import React from "react";
import "./Home.css";
import Typeahead from "../../components/Typeahead";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Typeahead />
      </div>
    );
  }
}

export default Home;