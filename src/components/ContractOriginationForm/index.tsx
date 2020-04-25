import React, { ReactElement, useState, useEffect } from "react";
import Creatable from "react-select/creatable";
import {
  generateNetworkSelectValue,
  networkSelectOptions,
  networkSelectStyles,
} from "../../utils/custom-network-select";
import LoadingSpinner from "../LoadingSpinner";
import ToolTipComponent from "../Tooltip";
import { ContractOriginationFormProps } from "./types";
import { useForm } from "react-hook-form";
import "./styles.css";

const ContractOriginationForm = (props: ContractOriginationFormProps): ReactElement | null => {
  const {
    setSigner,
    handleNetworkChange,
    txnAddress,
    network,
    handleLaunchSubmit,
    loading,
    currentStep,
    setCurrentStep,
  } = props;
  const { register, handleSubmit } = useForm();
  const [chosenSigner, setChosenSigner] = useState<string>("");

  useEffect(() => {
    return () => {
      setChosenSigner("");
    };
  }, [handleSubmit]);

  const handleChange = (selectedOption: any) => {
    console.log(selectedOption);
    handleNetworkChange(selectedOption.value);
  };

  const locallyUpdateSigner = (e: React.MouseEvent<HTMLInputElement>) => {
    // Update local state for button CSS effects
    setChosenSigner(e.currentTarget.value);
    // Update app state
    setSigner(e.currentTarget.value);
  };

  if (currentStep !== 3) return null;
  return (
    <>
      <span onClick={() => setCurrentStep(2)} className="left"></span>
      <div id="dialog">
        <h2>
          Originate Contract{" "}
          <ToolTipComponent
            title={
              <>
                <h5>Step 3: Originate (aka Deploy) a clone of this contract</h5>
                <p>
                  {
                    "In this step, George Cloney will help you clone the fetched and reviewed smart contract to any Tezos network."
                  }
                </p>
                <p>{"Mr. Cloney will also allow you to choose any method to sign the transaction that you please!"}</p>
              </>
            }
            placement="bottom"
          />
        </h2>
        <label id="react-select-label">Choose Network</label>
        <Creatable
          styles={networkSelectStyles}
          name="address"
          ref={register}
          className="network-select"
          options={networkSelectOptions}
          value={generateNetworkSelectValue(network)}
          onChange={handleChange}
        />
        <label id="react-select-signer-label">Choose Signer</label>
        <label className="signer-toolbar">
          {network === "carthagenet" && (
            <>
              <input onClick={locallyUpdateSigner} value="ephemeral" id="ephemeral" type="radio" />
              <label
                className={chosenSigner === "ephemeral" ? "signer-button-selected" : "signer-button"}
                htmlFor="ephemeral"
              >
                Let Us Sign
              </label>
            </>
          )}
          <input onClick={locallyUpdateSigner} value="beacon" id="beacon" type="radio" />
          <label className={chosenSigner === "beacon" ? "signer-button-selected" : "signer-button"} htmlFor="beacon">
            Beacon
          </label>
          <input onClick={locallyUpdateSigner} value="tezbridge" id="tezbridge" type="radio" />
          <label
            className={chosenSigner === "tezbridge" ? "signer-button-selected" : "signer-button"}
            htmlFor="tezbridge"
          >
            TezBridge
          </label>
        </label>
        <div id="content">
          <div id="contract-launch-form">
            <form onSubmit={handleSubmit(handleLaunchSubmit)}>
              {loading ? (
                <LoadingSpinner className="loading-spinner-origination" />
              ) : (
                <input disabled={!chosenSigner ? true : false} id="show-balance-button" type="submit" />
              )}
            </form>
          </div>
        </div>
      </div>
      {txnAddress.length > 0 ? (
        <span onClick={() => setCurrentStep(4)} className="right-next-step"></span>
      ) : (
        <span className="right"></span>
      )}
    </>
  );
};

export default ContractOriginationForm;
