import React from "react";
import { Footer } from "./Footer";

export const ThnakYouPage = () => {
  return (
    <div className="container has-text-centered">
      <header className="site-header" id="header">
        <h1 className="site-header__title" data-lead-id="site-header-title">
          THANK YOU!
        </h1>
      </header>

      <div className="main-content">
        <img className="check-image" src="/media/correct.svg" alt="check" />
        <p className="main-content__body" data-lead-id="main-content-body">
          Thank you for providing your payment details, Hava a good day.
        </p>
      </div>
      <Footer />
    </div>
  );
};
