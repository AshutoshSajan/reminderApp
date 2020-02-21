import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

const Header = props => {
  const handleLogout = () => {
    localStorage.clear();
    props.dispatch({ type: "LOGOUT", payload: null });
    props.history.push("/");
  };

  return (
    <nav
      style={{ background: "teal" }}
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <p className="title">Reminder App</p>
        </Link>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            {props.auth.mentor ? (
              <>
                <Link className="navbar-item" to="/students/create">
                  <strong>Create student</strong>
                </Link>
                <Link className="navbar-item" to="/students/list-students">
                  <strong>List student</strong>
                </Link>
                {/* TODO: remove these two links after testing  */}
                <Link
                  className="navbar-item"
                  to="/students/:id/payment-reminder"
                >
                  <strong>Create Reminder</strong>
                </Link>
                <Link
                  className="navbar-item"
                  to="/students/:id/send-payment-details"
                >
                  <strong>Create Payment</strong>
                </Link>
                <Link className="navbar-item" to="/payments/list-payments">
                  <strong>List Payments</strong>
                </Link>
                <Link className="navbar-item" to="/reminders/list-reminders">
                  <strong>List Reminders</strong>
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {props.auth.isAuthenticated ? (
              <button className="button is-warning" onClick={handleLogout}>
                <strong>Logout</strong>
              </button>
            ) : (
              <Link className="button is-primary" to="/login">
                <strong>Login</strong>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = store => store;

export default withRouter(connect(mapStateToProps)(Header));
