export interface SnackbarGroupProps {
  snackbar: boolean;
  closeSnackbar: () => void;
  txnAddress: string;
  error: string;
  loading: boolean;
  loadingMessage: string;
  launchNetwork: string;
}
