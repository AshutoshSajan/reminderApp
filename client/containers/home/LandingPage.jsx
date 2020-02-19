import React from "react";
import Header from "../common/Header";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="card">
        <h1 className="text-center title" style={{ textAlign: "center" }}>
          Reminder App landing page
        </h1>
        <img src="/media/programmers-life.jpg" alt="landing page image" />
      </div>
    </div>
  );
};

export default LandingPage;
