import { Dispatch, SetStateAction } from "react";

export interface ContractOriginationFormProps {
  setSigner: Dispatch<SetStateAction<string>>;
  handleNetworkChange: (network: string) => void;
  handleLaunchSubmit: () => void;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
  signer: string;
  network: string;
  loading: boolean;
}
