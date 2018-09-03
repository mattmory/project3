import React from "react";
import "./Home.css";
import Login from "../../components/Login";
import Nav from "../../components/Nav";
class Home extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Login />
      </div>
    );
  }
}

export default Home;