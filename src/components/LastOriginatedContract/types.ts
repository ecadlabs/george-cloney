import { MichelsonV1Expression } from "@taquito/rpc";

export interface LastOriginatedContractProps {
  reset: () => void;
  lastOriginatedContract: string;
  currentStep: number;
  code: MichelsonV1Expression[];
}
