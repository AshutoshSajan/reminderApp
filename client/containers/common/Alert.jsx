import React, { useState } from 'react';

export const Alert = (props) => {
  const { text, className, hideError, hideErrorHandler } = props;

  const [showAlert, setShowAlert] = useState('');

  setTimeout(() => {
    setShowAlert('show-alert');
  }, 1000);

  return (
    <div
      className={`alert notification is-light
          ${hideError ? 'hide-alert' : showAlert}
          ${className ? className : ''}
          has-text-centered`}
    >
      <button className="delete" onClick={hideErrorHandler}></button>
      <strong>{text}</strong>
    </div>
  );
};
