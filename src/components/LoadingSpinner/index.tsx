import React, { ReactElement } from "react";

const LoadingSpinner = (): ReactElement => (
  <img src="spinner.gif" alt="Loading..." style={{ width: "20px", display: "block" }} />
);

export default LoadingSpinner;
