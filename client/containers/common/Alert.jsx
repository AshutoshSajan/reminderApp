import React, { useState, useEffect } from "react";

export const Alert = props => {
  const { text, className } = props;

  const [showAlert, setShowAlert] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);

  useEffect(() => {
    handleAlert();
  }, []);

  const handleAlert = () => {
    console.log("handle alert called...");

    setShowAlert(true);
    setTimeout(() => {
      console.log("close alert called...");

      setShowAlert(false);
      setHideAlert(true);
    }, 5000);
  };

  return (
    <div className="container alert">
      <div
        className={`notification ${className ? className : ""}`}
        style={
          ({ transition: "all ese-in-out" },
          hideAlert ? { transform: "translateY(-100%)" } : {})
        }
        // style={{
        //   position: "absolute",
        //   left: 50,
        //   top: 0,
        //   transform: "translateY(-100%)",
        //   transition: "all ease-in-out"
        // }}
      >
        {showAlert ? (
          <div
          // style={{
          //   transform: "translateY(100%)"
          // }}
          >
            <strong>{text}</strong>
          </div>
        ) : null}
      </div>
    </div>
  );
};
