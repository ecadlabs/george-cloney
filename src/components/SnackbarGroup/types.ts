export interface SnackbarGroupProps {
  snackbar: boolean;
  closeSnackbar: () => void;
  error: string;
  loading: boolean;
  loadingMessage: string;
}
