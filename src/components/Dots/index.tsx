import React, { ReactElement } from "react";
import { DotsProps } from "./types";
import "./styles.css";

const Dots = (props: DotsProps): ReactElement => {
  const { code, launchNetwork, signer, currentStep } = props;

  return (
    <div className="dots-container">
      <span className={`${code.length > 0 ? "dot completed" : "dot"} ${currentStep === 1 ? "active" : ""}`}>1</span>
      <span className={launchNetwork !== "Select A Network..." && signer ? "dot active" : "dot"}>2</span>
    </div>
  );
};

export default Dots;
