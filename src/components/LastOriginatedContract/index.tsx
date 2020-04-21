import React, { ReactElement } from "react";
import { LastLaunchedContractProps } from "./types";
import "./styles.css";

const LastOriginatedContract = (props: LastLaunchedContractProps): ReactElement => {
  const { lastLaunchedContract, launchNetwork } = props;

  return (
    <>
      <div className="last-originated-contract-div">
        <a href={`https://${launchNetwork}.tzstats.com/${lastLaunchedContract}`}>
          <button>View Last Originated Contract</button>
        </a>
      </div>
    </>
  );
};

export default LastOriginatedContract;
