import React from "react";
import Header from "../common/Header";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          placeItems: "center",
          justifyContent: "center",
          placeItems: "flex-start"
        }}
      >
        <h1 className="title is-4 is-capitalized">
          Welcome to payment reminder app
        </h1>
        <Link
          to="/login"
          className="title is-4"
          style={{
            marginLeft: "20px",
            textDecoration: "underline",
            fontWeight: "normal"
          }}
        >
          Login
        </Link>
      </div>
      <img src="/media/reminder.svg" alt="landing page image" />
    </div>
  );
};

export default LandingPage;
