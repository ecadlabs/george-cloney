import React, { ReactElement } from "react";
import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ToolTipProps } from "./types";
import "./styles.css";

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    marginTop: "-15px",
    marginBottom: "-15px",
    paddingTop: "-15px",
    paddingBottom: "-15px",
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 260,
    fontSize: 16,
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const ToolTipComponent = (props: ToolTipProps): ReactElement => {
  const { title, placement } = props;
  return (
    <div className="tooltip">
      <HtmlTooltip title={title} placement={placement || "bottom"}>
        <span>?</span>
      </HtmlTooltip>
    </div>
  );
};

export default ToolTipComponent;
