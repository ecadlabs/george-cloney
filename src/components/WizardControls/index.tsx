import React, { ReactElement } from "react";
import { WizardControlsProps } from "./types";
import "./styles.css";

const WizardControls = (props: WizardControlsProps): ReactElement => {
  const { code, currentStep, txnAddress } = props;

  const generateClasses = (step: number) => {
    switch (step) {
      case 1:
        if (code.length > 0 && currentStep === 1) {
          return "step active-completed";
        } else if (code.length > 0 && currentStep !== 1) {
          return "step completed";
        } else if (code.length <= 0 && currentStep === 1) {
          return "step active";
        } else {
          return "step";
        }
      case 2:
        if (code.length > 0 && currentStep === 2) {
          return "step active-completed";
        } else if (code.length > 0 && currentStep !== 2) {
          return "step completed";
        } else if (code.length <= 0 && currentStep === 2) {
          return "step active";
        } else {
          return "step";
        }
      case 3:
        if (txnAddress && currentStep === 3) {
          return "step active-completed";
        } else if (txnAddress && currentStep !== 3) {
          return "step completed";
        } else if (!txnAddress && currentStep === 3) {
          return "step active";
        } else {
          return "step";
        }
      case 4:
        if (txnAddress && currentStep === 4) {
          return "step active-completed";
        } else if (txnAddress && currentStep !== 4) {
          return "step completed";
        } else if (!txnAddress && currentStep === 4) {
          return "step active";
        } else {
          return "step";
        }
      default:
        break;
    }
  };

  return (
    <div className="wizard-container">
      <div className="wizard-steps">
        <div>
          <span className={generateClasses(1)}>1</span>
          <br />
          Fetch Contract
        </div>
        <div>
          <span className={generateClasses(2)}>2</span>
          <br />
          Review Contract
        </div>
        <div>
          <span className={generateClasses(3)}>3</span>
          <br />
          Deploy New Contract
        </div>
        <div>
          <span className={generateClasses(4)}>4</span>
          <br />
          View New Contract
        </div>
      </div>
    </div>
  );
};

export default WizardControls;
