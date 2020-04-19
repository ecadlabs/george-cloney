import { MichelsonV1Expression } from "@taquito/rpc";

export interface ContractFormProps {
  handleNetworkChange: (network: string) => void;
  updateContractAddress: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleContractSubmit: () => void;
  code: MichelsonV1Expression[];
  currentStep: number;
  contractAddress: string;
  network: string;
  loading: boolean;
}
