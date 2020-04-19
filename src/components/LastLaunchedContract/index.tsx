import React, { ReactElement } from "react";
import { LastLaunchedContractProps } from "./types";
import "./styles.css";

const LastLaunchedContract = (props: LastLaunchedContractProps): ReactElement => {
  const { lastLaunchedContract } = props;

  return (
    <div className="last-launched-contract-div">
      <h3>
        Last Launched Contract:
        <div id="last-launched-contract">
          <h5>{lastLaunchedContract}</h5>
        </div>
      </h3>
    </div>
  );
};

export default LastLaunchedContract;
