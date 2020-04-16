import React, { ReactElement } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { SnackbarProps } from "./types";

const SnackbarComponent = (props: SnackbarProps): ReactElement => {
  const { snackbar, closeSnackbar, type, children, duration } = props;

  const handleClose = (e: any, reason: string) => {
    if (reason !== "clickaway") {
      closeSnackbar();
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={snackbar}
      autoHideDuration={duration === "none" ? null : 5000}
      onClose={handleClose}
    >
      <MuiAlert elevation={6} variant="filled" onClose={closeSnackbar} severity={type}>
        {children}
      </MuiAlert>
    </Snackbar>
  );
};
export default SnackbarComponent;
