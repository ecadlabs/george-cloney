import { Dispatch, SetStateAction } from "react";

export interface ContractResultFormProps {
  txnAddress: string;
  currentStep: number;
  launchNetwork: string;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}
