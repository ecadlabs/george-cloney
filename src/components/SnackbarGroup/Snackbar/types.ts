import { ReactElement } from "react";

export interface SnackbarProps {
  snackbar: boolean;
  type: "error" | "success" | "warning" | "info" | undefined;
  children: ReactElement;
  duration?: number | string;
}
