import React, { ReactElement, useState } from "react";
import { LaunchFormProps } from "./types";
import Select from "react-select";
import { useForm } from "react-hook-form";
import "./styles.css";

const LaunchForm = (props: LaunchFormProps): ReactElement | null => {
  const { updateSigner, handleNetworkChange, network, handleLaunchSubmit, loading, currentStep } = props;
  const { register, handleSubmit } = useForm();
  const [chosenSigner, setChosenSigner] = useState<string>("");
  const selectValue = { value: network, label: network.charAt(0).toUpperCase() + network.slice(1) };

  const options = [
    { value: "mainnet", label: "Mainnet" },
    { value: "carthagenet", label: "Carthagenet" },
    { value: "sandbox", label: "Sandbox" },
  ];

  const handleChange = (selectedOption: any) => {
    handleNetworkChange(selectedOption.value);
  };

  const locallyUpdateSigner = (e: React.MouseEvent<HTMLInputElement>) => {
    setChosenSigner(e.currentTarget.value);
    updateSigner(e);
  };

  if (currentStep !== 2) return null;
  return (
    <>
      <div id="dialog">
        <h2>Originate Contract</h2>
        <label id="react-select-label">Choose Network</label>
        <Select
          name="address"
          ref={register}
          className="network-select"
          options={options}
          value={selectValue}
          onChange={handleChange}
        />
        <label id="react-select-signer-label">Choose Signer</label>
        <label className="signer-toolbar">
          {network !== "mainnet" && (
            <>
              <input onClick={locallyUpdateSigner} value="ephemeral" id="ephemeral" type="radio" />
              <label
                className={chosenSigner === "ephemeral" ? "signer-button-selected" : "signer-button"}
                htmlFor="ephemeral"
              >
                Ephemeral Key
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
              <input disabled={loading || !chosenSigner ? true : false} id="show-balance-button" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaunchForm;
