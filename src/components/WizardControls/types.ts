import { MichelsonV1Expression } from "@taquito/rpc";

export interface WizardControlsProps {
  code: MichelsonV1Expression[];
  txnAddress: string;
  currentStep: number;
}
