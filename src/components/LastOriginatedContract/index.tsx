/* eslint-disable no-mixed-operators */
import React, { ReactElement } from "react";
import { LastLaunchedContractProps } from "./types";
import "./styles.css";

const LastOriginatedContract = (props: LastLaunchedContractProps): ReactElement => {
  const { lastLaunchedContract, launchNetwork, reset, currentStep, code } = props;

  return (
    <>
      <div className="last-originated-contract-div">
        {lastLaunchedContract && (
          <a href={`https://${launchNetwork}.tzstats.com/${lastLaunchedContract}`}>
            <button>View Last Originated Contract</button>
          </a>
        )}
        {currentStep > 1 || code.length > 0 ? (
          <button onClick={reset} className="reset-button">
            Reset George Cloney
          </button>
        ) : null}
      </div>
    </>
  );
};

export default LastOriginatedContract;
