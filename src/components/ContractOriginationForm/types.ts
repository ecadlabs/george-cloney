import { Dispatch, SetStateAction } from "react";

export interface ContractOriginationFormProps {
  setupSigner: (signer: string) => Promise<void>;
  setSigner: Dispatch<SetStateAction<string>>;
  handleNetworkChange: (network: string) => void;
  handleLaunchSubmit: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setLoadingMessage: Dispatch<SetStateAction<string>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  txnAddress: string;
  currentStep: number;
  signer: string;
  network: string;
  loading: boolean;
}
