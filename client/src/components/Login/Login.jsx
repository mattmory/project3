import React from "react";
import "./Login.css";
import API from "../../utils/API";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isRegistering: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToRegister = this.handleToRegister.bind(this);
    this.getButton = this.getButton.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    API.userLogin(this.state.email, this.state.password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleToRegister(event) {
    event.preventDefault();
    this.setState({isRegistering: true});
  }

  getButton() {
    if (this.state.isRegistering) {
      return (
        <div>
          <button type="submit" className="btn" id="register" onClick={this.handleSubmit}>
            Register
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="btn" id="toRegister" onClick={this.handleToRegister}>Register</button>
          <button type="submit" className="btn" id="login" onClick={this.handleSubmit}>
            Login
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>email:</label>
            <input type="text" className="form-control" id="email" value={this.state.email} onChange={this.handleEmailChange}></input>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
          </div>
          {this.getButton()}
        </form>
      </div>
    );
  }
}

export default Login;