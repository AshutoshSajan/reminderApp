import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../common/Header";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";

class HomePage extends Component {
  render() {
    return (
      <div>
        {this.props.auth.isAuthenticated ? <Dashboard /> : <LandingPage />}
      </div>
    );
  }
}

const mapStateToProps = store => store;

export default connect(mapStateToProps)(HomePage);
