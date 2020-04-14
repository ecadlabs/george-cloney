export interface LaunchFormProps {
  updateSigner: (event: React.MouseEvent<HTMLInputElement>) => void;
  signer: string;
  handleNetworkChange: (network: string) => void;
  handleLaunchSubmit: () => void;
  network: string;
  loading: boolean;
}
