import React, { ReactElement } from "react";
import { LastLaunchedContractProps } from "./types";

const LastLaunchedContract = (props: LastLaunchedContractProps): ReactElement => {
  const { lastLaunchedContract } = props;

  return (
    <>
      <h3>
        Last Launched Contract:
        <div id="last-launched-contract">
          <h5>{lastLaunchedContract}</h5>
        </div>
      </h3>
    </>
  );
};

export default LastLaunchedContract;
