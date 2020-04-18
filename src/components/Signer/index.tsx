import React, { ReactElement } from "react";
import { SignerProps } from "./types";

const Signer = (props: SignerProps): ReactElement | null => {
  const { network, signer, updateSigner, currentStep } = props;

  if (currentStep !== 2) return null;
  return (
    <div id="dialog">
      <h2>Choose Signer</h2>
      <span className="signer-toolbar">
        {network !== "mainnet" && (
          <>
            <input onClick={updateSigner} value="ephemeral" id="ephemeral" type="radio" />
            <label className={signer === "ephemeral" ? "signer-button-selected" : "signer-button"} htmlFor="ephemeral">
              Ephemeral Key
            </label>
          </>
        )}
        <input onClick={updateSigner} value="beacon" id="beacon" type="radio" />
        <label className={signer === "beacon" ? "signer-button-selected" : "signer-button"} htmlFor="beacon">
          Beacon
        </label>
        <input onClick={updateSigner} value="tezbridge" id="tezbridge" type="radio" />
        <label className={signer === "tezbridge" ? "signer-button-selected" : "signer-button"} htmlFor="tezbridge">
          TezBridge
        </label>
      </span>
    </div>
  );
};

export default Signer;
