import React from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import API from "../../utils/API";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isRegistering: false,
      instructionText: "Login to see your favorites.",
      toHome: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToRegister = this.handleToRegister.bind(this);
    this.getButton = this.getButton.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.isRegistering) {
      // New user registration
      API.userRegister(this.state.email, this.state.password)
        .then((res) => {
          console.log(res);
          // Auto login on successful registration
          this.handleLogin();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // User login
      this.handleLogin();
    }
  }

  handleLogin() {
    API.userLogin(this.state.email, this.state.password)
      // Redirect to landing page on successful login
      .then((res) => {
        console.log(this.props.authCB);
        this.props.authCB(this.state.email, res.data.isAuthenticated, res.data.id);
        this.setState({ toHome: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleToRegister(event) {
    event.preventDefault();
    this.setState({ isRegistering: true, instructionText: "Create an account to save your favorites." });
  }

  getButton() {
    if (this.state.isRegistering) {
      return (
        <div>
          <button type="submit" className="button float-right" id="register" onClick={this.handleSubmit}>
            Register
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <span className="toRegister" onClick={this.handleToRegister}>Register</span>
          <button type="submit" className="button float-right" id="login" onClick={this.handleSubmit}>
            Login
          </button>
        </div>
      );
    }
  }

  render() {
    if (this.state.toHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className="row acctDiv">
        <form className="col-6">
          <h1>Welcome!</h1>
          <h3>{this.state.instructionText}</h3>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Email" id="email" value={this.state.email} onChange={this.handleEmailChange}></input>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" id="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
          </div>
          <div>
            {this.getButton()}
          </div>
        </form>
      </div>
    );
  }
}

export default Login;