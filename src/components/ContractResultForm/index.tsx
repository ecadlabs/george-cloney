import React, { ReactElement } from "react";
import { ContractResultFormProps } from "./types";

const ContractResultForm = (props: ContractResultFormProps): ReactElement | null => {
  const { currentStep, txnAddress, launchNetwork } = props;
  if (currentStep !== 4) return null;
  return (
    <>
      <div id="dialog">
        <h2>Originate Contract</h2>
        <label id="react-select-signer-label">Originated Contract Address:</label>
        <h4 style={{ border: "1px solid black", borderRadius: "3px", width: "85%" }}>{txnAddress}</h4>
        <label id="react-select-signer-label">View Originated Contract Address:</label>
        <a target="_blank" rel="noopener noreferrer" href={`https://${launchNetwork}.tzstats.com/${txnAddress}`}>
          View on TzStats
        </a>
      </div>
    </>
  );
};

export default ContractResultForm;
