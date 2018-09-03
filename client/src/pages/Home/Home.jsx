import React from "react";
import "./Home.css";
// import Login from "../../components/Login";
import Typeahead from "../../components/Typeahead/Typeahead";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Typeahead />
      </div>
    );
  }
}

export default Home;