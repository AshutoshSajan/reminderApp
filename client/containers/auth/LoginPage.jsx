import React, { Component } from "react";
import { connect } from "react-redux";
import validator from "validator";

import { loginMentor } from "../../actions";
import Header from "../common/Header";

// dispatch as a prop.
class LoginPage extends Component {
  state = {
    email: "ashutoshsajan1213@gmail.com",
    password: "qwerty1234"
  };

  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      return alert("Email and password are must.");
    }

    if (password.length < 6) {
      return alert("Password must contain 6 characters.");
    }

    if (!validator.isEmail(email)) {
      return alert("Invalid email.");
    }

    this.props.dispatch(
      loginMentor({ email, password }, () => {
        console.log("called back");
        this.props.history.push("/");
      })
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const isAuthInProgress = this.props.auth.isAuthInProgress;
    const authError = this.props.auth.authError;

    const { email, password } = this.state;

    return (
      <div>
        <div className="container">
          <div className="form columns">
            <div className="column is-one-third is-offset-one-third">
              <label className="label">Login</label>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    className="input"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Text input"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    onChange={this.handleChange}
                    name="password"
                    className="input"
                    type="password"
                    value={password}
                    placeholder="Text input"
                  />
                </div>
              </div>
              {isAuthInProgress ? (
                <p>Logging in...</p>
              ) : (
                <button onClick={this.handleSubmit} className="button is-info">
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => store;

export default connect(mapStateToProps)(LoginPage);
