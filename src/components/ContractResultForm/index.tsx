import React, { ReactElement } from "react";
import { ContractResultFormProps } from "./types";
import { TEST_NETWORK, TEST_NETWORKS, MAIN_NETWORK } from "../../utils/constants";
import "./styles.css";

const ContractResultForm = (props: ContractResultFormProps): ReactElement | null => {
  const { currentStep, txnAddress, launchNetwork, setCurrentStep } = props;
  // Turns Delphinet into Delphi etc
  const shortenedNetworkName = (testNet: string): string => testNet.slice(0, -3);

  const getTzktUrl = (network: string, address: string): string | undefined => {
    switch (network) {
      case "mainnet":
        return `https://tzkt.io/${address}/operations`;
      case TEST_NETWORK:
        return `https://${shortenedNetworkName(TEST_NETWORK)}.tzkt.io/${address}/operations`;
      default:
        break;
    }
  };

  const getTezBlockUrl = (network: string, address: string): string | undefined => {
    switch (network) {
      case "mainnet":
        return `https://tezblock.io/account/${address}`;
      case TEST_NETWORK:
        return `https://${TEST_NETWORK}.tezblock.io/account/${address}`;
      default:
        break;
    }
  };

  const getTezosIdUrl = (network: string, address: string): string | undefined => {
    switch (network) {
      case "mainnet":
        return `https://tezos.id/${address}`;
      case TEST_NETWORK:
        return `https://${TEST_NETWORK}.tezos.id/${address}`;
      default:
        break;
    }
  };

  if (currentStep !== 4) return null;

  // Only show Better Call Dev if user is originating from a custom node
  if (!TEST_NETWORKS.includes(launchNetwork) && launchNetwork !== MAIN_NETWORK) {
    return (
      <>
        <span onClick={() => setCurrentStep(3)} className="left"></span>
        <div id="dialog">
          <h2>New Originated Contract</h2>
          <label id="react-select-signer-label">Contract Address:</label>
          <h4 className="newly-originated-contract">{txnAddress}</h4>
          <label id="react-select-signer-label">View Originated Contract:</label>
          <div className="contract-result-explorers">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://old.better-call.dev/sandbox/${txnAddress}/operations`}
            >
              <button className="contract-result-button">Better Call Dev</button>
            </a>
          </div>
        </div>
        <span className="right-arrow-hidden"></span>
      </>
    );
  }

  return (
    <>
      <span onClick={() => setCurrentStep(3)} className="left"></span>
      <div id="dialog">
        <h2>New Originated Contract</h2>
        <label id="react-select-signer-label">Contract Address:</label>
        <h4 className="newly-originated-contract">{txnAddress}</h4>
        <label id="react-select-signer-label">View Originated Contract:</label>
        <div className="contract-result-explorers">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://better-call.dev/${launchNetwork}/${txnAddress}/operations`}
          >
            <button className="contract-result-button">Better Call Dev</button>
          </a>
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
