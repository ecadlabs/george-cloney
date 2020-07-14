import { Dispatch, SetStateAction } from 'react';

export interface ContractOriginationFormProps {
  setupSigner: (signer: string) => Promise<void>;
  setSigner: Dispatch<SetStateAction<string>>;
  handleNetworkChange: (network: string) => void;
  handleLaunchSubmit: () => void;
  setLoadingMessage: Dispatch<SetStateAction<string>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  loadingMessage: string;
  txnAddress: string;
  currentStep: number;
  signer: string;
  network: string;
}
