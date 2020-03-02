import React, { Component } from "react";
import { connect } from "react-redux";
import validator from "validator";

import { loginMentor } from "../../actions";
import { Alert } from "../common/Alert";

class LoginPage extends Component {
  state = {
    email: "ashutoshsajan1213@gmail.com",
    password: "qwerty1234",
    hideError: true
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
        this.props.history.push("/");
      })
    );
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  hideErrorHandler = () => {
    this.setState({
      hideError: true
    });
  };

  render() {
    const { isAuthInProgress } = this.props.auth;
    const { authError } = this.props.auth;

    const { email, password, hideError } = this.state;

    return (
      <>
        {authError ? (
          <Alert
            text={authError}
            className="is-danger"
            hideErrorHandler={this.hideErrorHandler}
            hideError={hideError}
          />
        ) : null}
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
              <button
                onClick={this.handleSubmit}
                className={`button is-info ${
                  isAuthInProgress ? "is-loading" : null
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(store => store)(LoginPage);
