import React, { ReactElement } from "react";
import { WizardControlsProps } from "./types";
import "./styles.css";

const Dots = (props: WizardControlsProps): ReactElement => {
  const { code, signer, currentStep, setCurrentStep, txnAddress } = props;

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
        if (txnAddress) return setCurrentStep(4);
        break;
    }
  };

  return (
    <div className="wizard-container">
      <div className="wizard-steps">
        <div onClick={handleStepClick}>
          <span className={`${code.length > 0 ? "step completed" : "step"} ${currentStep === 1 ? "active" : ""}`}>
            1
          </span>
          <br />
          Fetch Contract
        </div>
        <div onClick={handleStepClick}>
          <span className={` ${code.length > 0 ? "step completed" : "step"} ${currentStep === 2 ? "active" : ""}`}>
            2
          </span>
          <br />
          Review Contract
        </div>
        <div onClick={handleStepClick}>
          <span className={`${signer ? "step completed" : "step"} ${currentStep === 3 ? "active" : ""}`}>3</span>
          <br />
          Deploy New Contract
        </div>
        <div onClick={handleStepClick}>
          <span className={`${txnAddress ? "step completed" : "step"} ${currentStep === 4 ? "active" : ""}`}>4</span>
          <br />
          View New Contract
        </div>
      </div>
    </div>
  );
};

export default Dots;
