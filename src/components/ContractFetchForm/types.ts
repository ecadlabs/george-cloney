import { Dispatch, SetStateAction } from 'react';
import { MichelsonV1Expression } from '@taquito/rpc';

export interface ContractFetchFormProps {
  handleError: (error: any) => void;
  handleNetworkChange: (network: string) => void;
  updateContractAddress: (newContractAddress: string) => void;
  handleContractSubmit: () => void;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setLoadingMessage: Dispatch<SetStateAction<string>>;
  loadingMessage: string;
  code: MichelsonV1Expression[];
  currentStep: number;
  contractAddress: string;
  network: string;
  validationError: string;
}
