import React, { ReactElement } from "react";
import Snackbar from "./Snackbar";
import { SnackbarGroupProps } from "./types";

const SnackbarGroup = (props: SnackbarGroupProps): null | ReactElement => {
  const { error, loadingMessage } = props;

  if (!error && !loadingMessage) return null;
  return (
    <>
      {error && !loadingMessage && (
        <Snackbar duration={5000} snackbar={error.length > 0} type="warning">
          <>{error}</>
        </Snackbar>
      )}
      {!error && loadingMessage && (
        <Snackbar duration={5000} snackbar={loadingMessage.length > 0} type="info">
          <>{loadingMessage}</>
        </Snackbar>
      )}
    </>
  );
};

export default SnackbarGroup;
