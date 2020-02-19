import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import LoginPage from "./auth/LoginPage";
import HomePage from "./home/HomePage";
import { verifyMentor } from "../actions/index";
import CreateStudent from "../containers/students/CreateStudent";
import NotFound from "../containers/common/NotFound";
import Dashboard from "../containers/home/Dashboard";
import PaymentDetails from "./payment/PaymentDetails";
import PaymentReminder from "./payment/PaymentReminder";
import Header from "../containers/common/Header";
import UpdateStudent from "./students/UpdateStudent";
import ListPayments from "./payment/ListPayments";
import ListReminders from "./reminder/ListReminders";
class App extends Component {
  componentDidMount() {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      this.props.dispatch({
        type: "TOKEN_VERIFICATION_START"
      });
      this.props.dispatch(verifyMentor(authToken));
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.props.auth.isIdentifyingToken ? null : (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/students/create" component={CreateStudent} />
            <Route exact path="/students/list-students" component={Dashboard} />
            <Route
              exact
              path="/students/:id/update"
              component={UpdateStudent}
            />
            <Route
              exact
              path="/students/:id/payment-reminder"
              component={PaymentReminder}
            />
            <Route
              exact
              path="/students/:id/send-payment-details"
              component={PaymentDetails}
            />
            <Route
              exact
              path="/payments/list-payments"
              component={ListPayments}
            />
            <Route
              exact
              path="/reminders/list-reminders"
              component={ListReminders}
            />

            <Route path="*" component={NotFound} />
          </Switch>
        )}
      </>
    );
  }
}

const mapStateToProps = store => store;

export default connect(mapStateToProps)(App);
