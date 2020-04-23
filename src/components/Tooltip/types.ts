import { ReactElement } from "react";

export interface ToolTipProps {
  title: string | ReactElement;
  placement?:
    | "bottom"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top"
    | undefined;
}
