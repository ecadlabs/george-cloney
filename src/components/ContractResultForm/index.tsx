import React, { ReactElement } from "react";
import { ContractResultFormProps } from "./types";
import "./styles.css";

const ContractResultForm = (props: ContractResultFormProps): ReactElement | null => {
  const { currentStep, txnAddress, launchNetwork } = props;
  if (currentStep !== 4) return null;
  return (
    <>
      <div id="dialog">
        <h2>New Originated Contract</h2>
        <label id="react-select-signer-label">Contract Address:</label>
        <h4 className="newly-originated-contract">{txnAddress}</h4>
        <label id="react-select-signer-label">View Contract Address:</label>
        <div className="contract-result-explorers">
          <a target="_blank" rel="noopener noreferrer" href={`https://${launchNetwork}.tzstats.com/${txnAddress}`}>
            <button className="contract-result-button">TzStats</button>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://arronax.io/tezos/${launchNetwork}/accounts/${txnAddress}`}
          >
            <button className="contract-result-button">Arronax</button>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={`https://${launchNetwork}.tzstats.com/${txnAddress}`}>
            <button className="contract-result-button">Better Call Dev</button>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={`https://${launchNetwork}.tzstats.com/${txnAddress}`}>
            <button className="contract-result-button">TezBlock</button>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={`https://${launchNetwork}.tzstats.com/${txnAddress}`}>
            <button className="contract-result-button">Tezos.ID</button>
          </a>
        </div>
      </div>
    </>
  );
};

export default ContractResultForm;
