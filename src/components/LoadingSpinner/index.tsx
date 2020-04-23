import React, { ReactElement } from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { LoadingSpinnerProps } from "./types";

const ColorCircularProgress = withStyles({
  root: {
    color: "white",
  },
})(CircularProgress);

const LoadingSpinner = (props: LoadingSpinnerProps): ReactElement => {
  const { className } = props;
  return (
    <div className={className || "loading-spinner"}>
      <ColorCircularProgress size={15} thickness={4} />
    </div>
  );
};

export default LoadingSpinner;
