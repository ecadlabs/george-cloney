import React, { ReactElement } from "react";
import { DotsProps } from "./types";
import "./styles.css";

const Dots = (props: DotsProps): ReactElement => {
  const { code, launchNetwork, signer, currentStep, setCurrentStep } = props;

  return (
    <div className="dots-container">
      <span onClick={() => setCurrentStep(1)} className={`${currentStep === 1 ? "hide-step" : "previous-step"}`}>
        Prev Step
      </span>
      <span className={`${code.length > 0 ? "dot completed" : "dot"} ${currentStep === 1 ? "active" : ""}`}>1</span>
      <span
        className={`${launchNetwork !== "Select A Network..." && signer ? "dot active" : "dot"} ${
          currentStep === 2 ? "active" : ""
        }`}
      >
        2
      </span>
      <button
        onClick={() => setCurrentStep(2)}
        disabled={code.length > 0 ? false : true}
        className={`${currentStep === 2 ? "hide-step" : "next-step"}`}
      >
        Next Step
      </button>
    </div>
  );
};

export default Dots;
