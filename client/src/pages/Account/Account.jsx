import React from "react";
import "./Account.css";
import Login from "../../components/Login";

const account = (props) => {
  return (
    < div className="container-fluid backgroundDiv" >
      <Login {...props} />
    </div >);
};

export default account;