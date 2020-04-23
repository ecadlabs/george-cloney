import React, { ReactElement } from "react";
import { LastOriginatedContractProps } from "./types";
import "./styles.css";

const LastOriginatedContract = (props: LastOriginatedContractProps): ReactElement => {
  const { lastOriginatedContract, reset, currentStep, code } = props;
  const networkAndContractInfo = lastOriginatedContract ? lastOriginatedContract.split(",") : "";
  const lastOriginatedAddress = networkAndContractInfo[0] ? networkAndContractInfo[0] : "";
  const lastOriginatedNetwork = networkAndContractInfo[1] ? networkAndContractInfo[1] : "";

  return (
    <>
      <div className="last-originated-contract-div">
        {lastOriginatedContract && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://${lastOriginatedNetwork}.tzstats.com/${lastOriginatedAddress}`}
          >
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
