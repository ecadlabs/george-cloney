import { MichelsonV1Expression } from "@taquito/rpc";

export interface EditorProps {
  currentStep: number;
  code: MichelsonV1Expression[];
  storage: MichelsonV1Expression | string | undefined;
}
