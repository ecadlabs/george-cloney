import React, { ReactElement } from "react";
import { StepButtonGroupProps } from "./types";
import "./styles.css";

const StepButtonGroup = (props: StepButtonGroupProps): ReactElement | null => {
  const { currentStep, setCurrentStep } = props;

  return (
    <div id="step-button-group">
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        {currentStep !== 1 && (
          <button onClick={() => setCurrentStep(currentStep - 1)}>
            Step {currentStep - 1 === 0 ? 1 : currentStep - 1}
          </button>
        )}
        {currentStep !== 3 && (
          <button
            style={{ marginLeft: currentStep === 1 ? "350px" : "" }}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Step {currentStep + 1}
          </button>
        )}
      </span>
    </div>
  );
};

export default StepButtonGroup;
