import React, { ReactElement } from "react";
import { ContractFormProps } from "./types";
import Select from "react-select";
import { useForm } from "react-hook-form";
import "./styles.css";

const ContractForm = (props: ContractFormProps): ReactElement | null => {
  const {
    handleNetworkChange,
    network,
    updateContractAddress,
    handleContractSubmit,
    loading,
    currentStep,
    contractAddress,
    validationError,
  } = props;
  const { register, handleSubmit } = useForm();

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
      <div id="dialog">
        <h2>Fetch Contract Code</h2>
        <label id="react-select-label">Choose Network</label>
        <Select className="network-select" options={options} value={selectValue} onChange={handleChange} />
        <div id="content">
          <label id="react-select-lookup-label">Enter Contract Address</label>
          <div id="contract-code-form">
            <form onSubmit={handleSubmit(handleContractSubmit)}>
              <input
                onChange={updateContractAddress}
                placeholder="Contract Address"
                id="address-input"
                name="address"
                ref={register}
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
    </>
  );
};

export default ContractForm;
