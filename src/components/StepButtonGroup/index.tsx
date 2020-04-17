import React, { ReactElement } from "react";
import { StepButtonGroupProps } from "./types";
import "./styles.css";

const StepButtonGroup = (props: StepButtonGroupProps): ReactElement => {
  const { currentStep, setCurrentStep } = props;

  return (
    <div
      id="step-button-group"
      style={{
        width: "400px",
        margin: "0 auto",
      }}
    >
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        {currentStep !== 1 && (
          <button onClick={() => setCurrentStep(currentStep - 1)}>
            Step {currentStep - 1 === 0 ? 1 : currentStep - 1}
          </button>
        )}
        <button
          style={{ marginLeft: currentStep === 1 ? "350px" : "" }}
          onClick={() => setCurrentStep(currentStep + 1)}
        >
          Step {currentStep + 1}
        </button>
      </span>
    </div>
  );
};

export default StepButtonGroup;
