import React, { ReactElement } from "react";
import { WizardControlsProps } from "./types";
import "./styles.css";

const Dots = (props: WizardControlsProps): ReactElement => {
  const { code, signer, currentStep, setCurrentStep } = props;

  return (
    <div className="dots-container">
      <span onClick={() => setCurrentStep(1)} className={`${currentStep === 1 ? "hide-step" : "previous-step"}`}>
        Prev Step
      </span>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "inline !important", marginRight: "20px", marginLeft: "20px" }}>
          <span className={`${code.length > 0 ? "dot completed" : "dot"} ${currentStep === 1 ? "active" : ""}`}>1</span>
          <br />
          Fetch Contract
        </div>
        <div style={{ display: "inline !important", marginRight: "20px", marginLeft: "20px" }}>
          <span className={` ${signer ? "dot completed" : "dot"} ${currentStep === 2 ? "active" : ""}`}>2</span>
          <br />
          Review Contract
        </div>
        <div style={{ display: "inline !important", marginRight: "20px", marginLeft: "20px" }}>
          <span className={`${code.length > 0 ? "dot completed" : "dot"} ${currentStep === 3 ? "active" : ""}`}>3</span>
          <br />
          Sign/Deploy Contract
        </div>
      </div>
      <button
        onClick={() => setCurrentStep(2)}
        disabled={code.length > 0 ? false : true}
        className={`${currentStep === 2 || code.length === 0 ? "hide-step" : "next-step"}`}
      >
        Next Step
      </button>
    </div>
  );
};

export default Dots;
