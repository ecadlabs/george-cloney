import React, { ReactElement } from "react";
import ToolTipComponent from "../Tooltip";
import LoadingSpinner from "../LoadingSpinner";
import { generateSelectValue, selectOptions, selectStyles } from "../../utils/custom-network-select";
import { ContractFetchFormProps } from "./types";
import Creatable from "react-select/creatable";
import { useForm } from "react-hook-form";
import "./styles.css";

const ContractFetchForm = (props: ContractFetchFormProps): ReactElement | null => {
  const {
    handleNetworkChange,
    handleError,
    network,
    updateContractAddress,
    handleContractSubmit,
    loading,
    currentStep,
    setCurrentStep,
    contractAddress,
    validationError,
    code,
  } = props;
  const { register, handleSubmit } = useForm();

  const handleChange = (selectedOption: any) => {
    handleNetworkChange(selectedOption.value);
  };

  if (currentStep !== 1) return null;
  return (
    <>
      <span className="left-arrow-hidden"></span>
      <div id="dialog">
        <h2>
          Fetch Contract Code{" "}
          <ToolTipComponent
            title={
              <>
                <h5>Step 1: Fetch Smart Contract Code</h5>
                <p>{"In this step, George Cloney will fetch you any smart contract code from any Tezos network."}</p>
                <p>{"From here, you'll be able to inspect the Smart Contract code and initial storage next."}</p>
              </>
            }
            placement="bottom"
          />
        </h2>
        <label id="react-select-label">Choose Network or Insert Custom Network</label>
        <Creatable
          styles={selectStyles}
          className="network-select"
          options={selectOptions}
          value={generateSelectValue(network)}
          onChange={handleChange}
          formatCreateLabel={() => "Add Custom Network"}
        />
        <div id="content">
          <label id="react-select-lookup-label">Enter Contract Address</label>
          <div id="contract-code-form">
            <form onSubmit={handleSubmit(handleContractSubmit)}>
              <input
                className={validationError && "validation-error"}
                onChange={updateContractAddress}
                placeholder="Contract Address"
                id="address-input"
                name="address"
                ref={register}
                onErrorCapture={handleError}
              />
              {validationError !== "" && <span className="address-validation">Invalid Contract Address</span>}
              <br />
              {loading ? (
                <LoadingSpinner />
              ) : (
                <input
                  className="fetch-contract-button"
                  disabled={loading || !contractAddress || validationError ? true : false}
                  id={`${loading ? "show-balance-button-hovered" : "show-balance-button"}`}
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
