import React from 'react';
import './ErrorBox.css';

const ErrorBox = ({ message }) => {
  return <div className="error-box">{message}</div>;
};

export default ErrorBox;
