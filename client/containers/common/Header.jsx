import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

const Header = props => {
  const [toggle, setToggle] = useState(false);

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
          tabIndex="true"
          onFocus={() => setToggle(!toggle)}
          // onBlur={() => setToggle(!toggle)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${toggle ? "navbar-active" : ""}`}
        >
          <div className="navbar-start">
            {props.auth.mentor ? (
              <>
                <Link
                  className="navbar-item"
                  to="/students/create"
                  tabIndex="true"
                  // onClick={() => setToggle(!toggle)}
                >
                  <strong>Create student</strong>
                </Link>
                <Link
                  className="navbar-item"
                  to="/students/list-students"
                  tabIndex="true"
                  // onClick={() => setToggle(!toggle)}
                >
                  <strong>List student</strong>
                </Link>

                {/* TODO: remove these two links after testing  */}
                <Link
                  className="navbar-item"
                  to="/students/:id/payment-reminder"
                  tabIndex="true"
                  // onClick={() => setToggle(!toggle)}
                >
                  <strong>Create Reminder</strong>
                </Link>
                <Link
                  className="navbar-item"
                  to="/students/:id/send-payment-details"
                  tabIndex="true"
                  // onClick={() => setToggle(!toggle)}
                >
                  <strong>Create Payment</strong>
                </Link>
                <Link
                  className="navbar-item"
                  to="/payments/list-payments"
                  tabIndex="true"
                  // onClick={() => setToggle(!toggle)}
                >
                  <strong>List Payments</strong>
                </Link>
                <Link
                  className="navbar-item"
                  to="/reminders/list-reminders"
                  tabIndex="true"
                  // onClick={() => setToggle(!toggle)}
                >
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
