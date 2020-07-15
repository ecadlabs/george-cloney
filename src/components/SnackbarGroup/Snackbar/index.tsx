import React, { ReactElement } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { SnackbarProps } from "./types";

const SnackbarComponent = (props: SnackbarProps): ReactElement => {
  const { snackbar, type, children, duration } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={snackbar}
      autoHideDuration={duration ? (duration as number | null | undefined) : 5000}
    >
      <MuiAlert elevation={6} variant="filled" severity={type}>
        {children}
      </MuiAlert>
    </Snackbar>
  );
};
export default SnackbarComponent;
