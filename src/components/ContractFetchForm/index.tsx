import React, { ReactElement } from "react";
import { ContractFetchFormProps } from "./types";
import Select from "react-select";
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
  const { register, handleSubmit, errors } = useForm();
  console.log(errors);
  const selectValue = { value: network, label: network.charAt(0).toUpperCase() + network.slice(1) };
  const options = [
    { value: "mainnet", label: "Mainnet" },
    { value: "carthagenet", label: "Carthagenet" },
    { value: "sandbox", label: "Sandbox" },
  ];

  const handleChange = (selectedOption: any) => {
    handleNetworkChange(selectedOption.value);
  };

  if (currentStep !== 1) return null;
  return (
    <>
      <span className="left-arrow-hidden"></span>
      <div id="dialog">
        <h2>Fetch Contract Code</h2>
        <label id="react-select-label">Choose Network</label>
        <Select className="network-select" options={options} value={selectValue} onChange={handleChange} />
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
              <input
                className="fetch-contract-button"
                disabled={loading || !contractAddress ? true : false}
                id={`${loading ? "show-balance-button-hovered" : "show-balance-button"}`}
                type="submit"
                value="Fetch"
              />
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
