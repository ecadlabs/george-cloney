import React, { ReactElement } from "react";
import { LastLaunchedContractProps } from "./types";
import "./styles.css";

const LastOriginatedContract = (props: LastLaunchedContractProps): ReactElement => {
  const { lastLaunchedContract, launchNetwork, reset } = props;

  return (
    <>
      <div className="last-originated-contract-div">
        {lastLaunchedContract && (
          <a href={`https://${launchNetwork}.tzstats.com/${lastLaunchedContract}`}>
            <button>View Last Originated Contract</button>
          </a>
        )}
        <button onClick={reset} className="reset-button">
          Reset George Cloney
        </button>
      </div>
    </>
  );
};

export default LastOriginatedContract;
