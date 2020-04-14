import React from "react";
import Snackbar from "../Snackbar/Snackbar";
import { SnackbarGroupProps } from "./types";

const SnackbarGroup = (props: SnackbarGroupProps) => {
  const { txnAddress, snackbar, closeSnackbar, error, loading, loadingMessage, launchNetwork } = props;

  return (
    <>
      {txnAddress && !loadingMessage && (
        <Snackbar snackbar={snackbar} closeSnackbar={closeSnackbar} type="success">
          <>
            Launched new contract at {txnAddress}
            <a target="_blank" rel="noopener noreferrer" href={`https://${launchNetwork}.tzstats.com/${txnAddress}`}>
              View on TzStats
            </a>
          </>
        </Snackbar>
      )}
      {error && !loadingMessage && (
        <Snackbar snackbar={snackbar} closeSnackbar={closeSnackbar} type="warning">
          <>{error}</>
        </Snackbar>
      )}
      {loading && (
        <Snackbar duration={"none"} snackbar={snackbar} closeSnackbar={closeSnackbar} type="info">
          <>{loadingMessage}</>
        </Snackbar>
      )}
    </>
  );
};

export default SnackbarGroup;
