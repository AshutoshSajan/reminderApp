import React, { useState, useEffect, memo, useMemo, Component } from "react";

export const Alert = props => {
  const { text, className } = props;
  console.log(text, className, "props classname...");

  const [showAlert, setShowAlert] = useState(false);
  const [display, setDisplay] = useState({ display: "block" });

  useEffect(() => {
    handleAlert();
  }, []);

  const handleAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    setTimeout(() => {
      setDisplay({ display: "none" });
    }, 6000);
  };

  return (
    <div
      style={display}
      className={`alert notification is-light 
          ${className ? className : ""}
          ${showAlert ? "show-alert" : "hide-alert"}
          has-text-centered`}
    >
      <strong>{text}</strong>
    </div>
  );
};
