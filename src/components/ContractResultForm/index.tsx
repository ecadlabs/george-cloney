import React, { ReactElement } from "react";
import { ContractResultFormProps } from "./types";
import "./styles.css";

const ContractResultForm = (props: ContractResultFormProps): ReactElement | null => {
  const { currentStep, txnAddress, launchNetwork, setCurrentStep } = props;

  const getTzktUrl = (network: string, address: string): string | undefined => {
    switch (network) {
      case "mainnet":
        return `https://tzkt.io/${address}/operations`;
      case "carthagenet":
        return `https://carthage.tzkt.io/${address}/operations`;
      default:
        break;
    }
  };

  const getTezBlockUrl = (network: string, address: string): string | undefined => {
    switch (network) {
      case "mainnet":
        return `https://tezblock.io/account/${address}`;
      case "carthagenet":
        return `https://carthagenet.tezblock.io/${address}`;
      default:
        break;
    }
  };

  const getTezosIdUrl = (network: string, address: string): string | undefined => {
    switch (network) {
      case "mainnet":
        return `https://tezos.id/${address}`;
      case "carthagenet":
        return `https://carthagenet.tezos.id/${address}`;
      default:
        break;
    }
  };

  if (currentStep !== 4) return null;
  return (
    <>
      <span onClick={() => setCurrentStep(3)} className="left"></span>
      <div id="dialog">
        <h2>New Originated Contract</h2>
        <label id="react-select-signer-label">Contract Address:</label>
        <h4 className="newly-originated-contract">{txnAddress}</h4>
        <label id="react-select-signer-label">View New Contract:</label>
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
          <a target="_blank" rel="noopener noreferrer" href={getTzktUrl(launchNetwork, txnAddress)}>
            <button className="contract-result-button">TzKT</button>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={getTezBlockUrl(launchNetwork, txnAddress)}>
            <button className="contract-result-button">TezBlock</button>
          </a>
          <a target="_blank" rel="noopener noreferrer" href={getTezosIdUrl(launchNetwork, txnAddress)}>
            <button className="contract-result-button">Tezos.ID</button>
          </a>
        </div>
      </div>
      <span className="right-arrow-hidden"></span>
    </>
  );
};

export default ContractResultForm;
