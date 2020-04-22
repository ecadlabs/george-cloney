import { MichelsonV1Expression } from "@taquito/rpc";

export interface LastLaunchedContractProps {
  reset: () => void;
  lastLaunchedContract: string;
  launchNetwork: string;
  currentStep: number;
  code: MichelsonV1Expression[];
}
