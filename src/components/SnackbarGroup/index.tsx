import React, { ReactElement } from "react";
import Snackbar from "./Snackbar";
import { SnackbarGroupProps } from "./types";

const SnackbarGroup = (props: SnackbarGroupProps): ReactElement => {
  const { closeSnackbar, error, loadingMessage } = props;
  return (
    <>
      {error && !loadingMessage && (
        <Snackbar snackbar={error.length > 0} closeSnackbar={closeSnackbar} type="warning">
          <>{error}</>
        </Snackbar>
      )}
      {!error && loadingMessage && (
        <Snackbar duration={"none"} snackbar={loadingMessage.length > 0} closeSnackbar={closeSnackbar} type="info">
          <>{loadingMessage}</>
        </Snackbar>
      )}
    </>
  );
};

export default SnackbarGroup;
