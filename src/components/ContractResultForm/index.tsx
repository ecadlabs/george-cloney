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
        <h3>{txnAddress}</h3>
        <label id="react-select-signer-label">View Originated Contract Address:</label>
        <a target="_blank" rel="noopener noreferrer" href={`https://${launchNetwork}.tzstats.com/${txnAddress}`}>
          View on TzStats
        </a>
      </div>
    </>
  );
};

export default ContractResultForm;
