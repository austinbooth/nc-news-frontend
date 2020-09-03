import React from "react";

const ErrorDisplay = ({ err: { msg, status } }) => {
  return (
    <>
      <p className="error">Whoops! {msg}</p>
      <p>(status code {status})</p>
    </>
  );
};

export default ErrorDisplay;
