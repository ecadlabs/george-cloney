import { MichelsonV1Expression } from "@taquito/rpc";

export interface WizardControlsProps {
  code: MichelsonV1Expression[];
  signer: string;
  txnAddress: string;
  currentStep: number;
}
