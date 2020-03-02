import React from "react";

export const Alert = props => {
  const { text, className, hideError, hideErrorHandler } = props;

  return (
    <div
      className={`alert notification is-light
          ${hideError ? "hide-alert" : "show-alert"}
          ${className ? className : ""}
          has-text-centered`}
    >
      <button className="delete" onClick={hideErrorHandler}></button>
      <strong>{text}</strong>
    </div>
  );
};
