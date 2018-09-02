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
          <button className="btn">Register</button>
          <button type="submit" className="btn" id="login" onClick={(event) => this.handleSubmit(event, this.state.email, this.state.password)}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;