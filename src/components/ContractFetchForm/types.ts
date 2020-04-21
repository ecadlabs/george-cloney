export interface ContractFormProps {
  handleNetworkChange: (network: string) => void;
  updateContractAddress: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleContractSubmit: () => void;
  currentStep: number;
  contractAddress: string;
  network: string;
  validationError: string;
  loading: boolean;
}
