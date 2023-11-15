import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container">
      <div className="landingpage-text-container">
        <h1 className="title is-4 is-capitalized">
          Welcome to payment reminder app
        </h1>
        <Link to="/login" className="landingpage-login-link title is-4">
          Login
        </Link>
      </div>
      <img src="/media/reminder.svg" alt="landing page image" />
    </div>
  );
};

export default LandingPage;
