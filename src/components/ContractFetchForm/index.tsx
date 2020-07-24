import React, { ReactElement } from "react";
import ToolTipComponent from "../Tooltip";
import LoadingSpinner from "../LoadingSpinner";
import {
  generateNetworkSelectValue,
  networkSelectOptions,
  networkSelectStyles
} from "../../utils/custom-network-select";
import {
  generateContractSelectValue,
  generateContractSelectOptions,
  contractSelectStyles
} from "../../utils/custom-contract-select";
import { ContractFetchFormProps } from "./types";
import Creatable from "react-select/creatable";
import { useForm } from "react-hook-form";
import { InitialState } from "../../utils/initial-app-state";
import "./styles.css";

const ContractFetchForm = (props: ContractFetchFormProps): ReactElement | null => {
  const {
    handleNetworkChange,
    setLoadingMessage,
    updateContractAddress,
    handleContractSubmit,
    setCurrentStep,
    code,
    network,
    loadingMessage,
    currentStep,
    contractAddress,
    validationError
  } = props;
  const { register, handleSubmit } = useForm();

  const handleChange = (selectedOption: any) => {
    if (loadingMessage) return;
    setLoadingMessage("Updating Network");
    handleNetworkChange(selectedOption.value);
    setLoadingMessage("");
  };

  const handleContractChange = (selectedOption: any) => {
    if (loadingMessage) return;
    setLoadingMessage("Updating Contract");
    updateContractAddress(selectedOption.value);
    setLoadingMessage("");
  };

  if (currentStep !== 1) return null;
  return (
    <>
      <span className="left-arrow-hidden"></span>
      <div id="dialog">
        <h2>
          <span>
            <span>Fetch Contract Code</span>
            <ToolTipComponent
              title={
                <>
                  <h3 className="tooltip-fetch">Step 1:</h3>
                  <h3>Fetch Smart Contract Code</h3>
                  <p>{"In this step, George Cloney will fetch you any smart contract code from any Tezos network."}</p>
                  <p>
                    {
                      "From here, you'll be able to see the contract's code and initial storage in Michelson in the next step."
                    }
                  </p>
                </>
              }
              placement="bottom"
              icon="?"
            />
          </span>
        </h2>
        <label id="react-select-label">Choose or Enter Network</label>
        <Creatable
          styles={networkSelectStyles}
          className="network-select"
          options={networkSelectOptions}
          value={generateNetworkSelectValue(network)}
          onChange={handleChange}
          formatCreateLabel={() => "Add Custom Network"}
        />
        <div id="content">
          <label id="react-select-lookup-label">Enter Contract Address</label>
          <div id="contract-code-form">
            <form onSubmit={handleSubmit(handleContractSubmit)}>
              <Creatable
                ref={register}
                styles={contractSelectStyles}
                className="contract-select"
                options={generateContractSelectOptions(network)}
                value={generateContractSelectValue(contractAddress)}
                onChange={handleContractChange}
                formatCreateLabel={() => "Add Contract Address"}
              />
              {validationError !== "" && <span className="address-validation">Invalid Contract Address</span>}
              <br />
              {loadingMessage ? (
                <LoadingSpinner />
              ) : (
                <input
                  className="fetch-contract-button"
                  disabled={
                    loadingMessage ||
                    !contractAddress ||
                    validationError ||
                    contractAddress === InitialState.CONTRACT_ADDRESS
                      ? true
                      : false
                  }
                  id={`${loadingMessage ? "show-balance-button-hovered" : "show-balance-button"}`}
                  type="submit"
                  value="Fetch"
                />
              )}
            </form>
          </div>
        </div>
      </div>
      {code.length > 0 ? (
        <span onClick={() => setCurrentStep(2)} className="right-next-step"></span>
      ) : (
        <span className="right"></span>
      )}
    </>
  );
};

export default ContractFetchForm;
