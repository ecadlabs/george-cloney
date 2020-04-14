import React, { ReactElement } from "react";
import { LaunchFormProps } from "./types";
import Select from "react-select";
import { useForm } from "react-hook-form";
import "./styles.css";

const LaunchForm = (props: LaunchFormProps): ReactElement => {
  const { handleNetworkChange, network, handleLaunchSubmit, updateSigner, signer, loading } = props;
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

  return (
    <>
      <div id="dialog">
        <h2>Launch Contract</h2>
        <Select
          name="address"
          ref={register}
          className="network-select"
          options={options}
          value={selectValue}
          onChange={handleChange}
        />
        <div id="content">
          <div id="contract-launch-form">
            <form onSubmit={handleSubmit(handleLaunchSubmit)}>
              <span className="signer-toolbar">
                <input onClick={updateSigner} value="ephemeral" id="ephemeral" type="radio" />
                <label
                  className={signer === "ephemeral" ? "signer-button-selected" : "signer-button"}
                  htmlFor="ephemeral"
                >
                  Ephemeral Key
                </label>
                <input onClick={updateSigner} value="tezbridge" id="tezbridge" type="radio" />
                <label
                  className={signer === "tezbridge" ? "signer-button-selected" : "signer-button"}
                  htmlFor="tezbridge"
                >
                  TezBridge
                </label>
                <input onClick={updateSigner} value="beacon" id="beacon" type="radio" />
                <label className={signer === "beacon" ? "signer-button-selected" : "signer-button"} htmlFor="beacon">
                  Beacon
                </label>
              </span>
              <input disabled={loading ? true : false} id="show-balance-button" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LaunchForm;
