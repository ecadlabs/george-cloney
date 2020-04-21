import { Dispatch, SetStateAction } from "react";

export interface LaunchFormProps {
  updateSigner: (event: React.MouseEvent<HTMLInputElement>) => void;
  handleNetworkChange: (network: string) => void;
  handleLaunchSubmit: () => void;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
  signer: string;
  network: string;
  loading: boolean;
}
