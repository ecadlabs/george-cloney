export interface SignerProps {
  updateSigner: (event: React.MouseEvent<HTMLInputElement>) => void;
  network: string;
  currentStep: number;
  signer: string;
}
