import React from "react";
import "./Home.css";
import Welcome from "../../components/Welcome";

const Home = (props) => (
  <div className="container-fluid backgroundDiv">
    <Welcome {...props} />
  </div>
);

export default Home;