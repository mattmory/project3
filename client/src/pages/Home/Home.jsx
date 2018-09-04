import React from "react";
import "./Home.css";
import Welcome from "../../components/Welcome";

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Welcome />
      </div>
    );
  }
}

export default Home;