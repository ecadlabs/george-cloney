import { ReactElement } from "react";

export interface SnackbarProps {
  snackbar: boolean;
  closeSnackbar: () => void;
  type: "error" | "success" | "warning" | "info" | undefined;
  children: ReactElement;
  duration?: number | string;
}
