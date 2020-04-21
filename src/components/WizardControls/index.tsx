import React, { ReactElement } from "react";
import { WizardControlsProps } from "./types";
import "./styles.css";

const Dots = (props: WizardControlsProps): ReactElement => {
  const { code, signer, currentStep, setCurrentStep } = props;

  const handleStepClick = (e: any) => {
    switch (e.target.innerText) {
      case "1":
        return setCurrentStep(1);
      case "2":
        if (code.length > 0) return setCurrentStep(2);
        break;
      case "3":
        if (code.length > 0) return setCurrentStep(3);
        break;
      case "4":
        if (code.length > 0) return setCurrentStep(4);
        break;
    }
  };

  return (
    <div className="dots-container">
      <div className="wizard-steps">
        <div onClick={handleStepClick}>
          <span className={`${code.length > 0 ? "dot completed" : "dot"} ${currentStep === 1 ? "active" : ""}`}>1</span>
          <br />
          Fetch Contract
        </div>
        <div onClick={handleStepClick}>
          <span className={` ${code.length > 0 ? "dot completed" : "dot"} ${currentStep === 2 ? "active" : ""}`}>
            2
          </span>
          <br />
          Review Contract
        </div>
        <div onClick={handleStepClick}>
          <span className={`${signer ? "dot completed" : "dot"} ${currentStep === 3 ? "active" : ""}`}>3</span>
          <br />
          Deploy New Contract
        </div>
        <div onClick={handleStepClick}>
          <span className={`${signer ? "dot completed" : "dot"} ${currentStep === 4 ? "active" : ""}`}>4</span>
          <br />
          View New Contract
        </div>
      </div>
    </div>
  );
};

export default Dots;
