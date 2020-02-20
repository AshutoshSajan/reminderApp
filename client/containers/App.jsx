import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { verifyMentor } from "../actions/index";

import LoginPage from "./auth/LoginPage";
import HomePage from "./home/HomePage";

import CreateStudent from "../containers/students/CreateStudent";
import UpdateStudent from "./students/UpdateStudent";

import NotFound from "../containers/common/NotFound";
import Dashboard from "../containers/home/Dashboard";

import CreatePayment from "./payment/CreatePayment";
import ListPayments from "./payment/ListPayments";
import EditPayment from "./payment/EditPayment";

import CreateReminder from "./reminder/CreateReminder";
import EditReminder from "./reminder/EditReminder";
import ListReminders from "./reminder/ListReminders";

import Header from "../containers/common/Header";
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
              component={CreateReminder}
            />
            <Route
              exact
              path="/students/:id/send-payment-details"
              component={CreatePayment}
            />
            <Route
              exact
              path="/payments/list-payments"
              component={ListPayments}
            />

            <Route path="/payments/:id/update" component={EditPayment} />

            <Route
              exact
              path="/reminders/list-reminders"
              component={ListReminders}
            />

            <Route path="/reminders/:id/update" component={EditReminder} />

            <Route path="*" component={NotFound} />
          </Switch>
        )}
      </>
    );
  }
}

const mapStateToProps = store => store;

export default connect(mapStateToProps)(App);
