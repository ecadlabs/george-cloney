import { MichelsonV1Expression } from "@taquito/rpc";
import { Dispatch, SetStateAction } from "react";

export interface EditorProps {
  currentStep: number;
  code: MichelsonV1Expression[];
  storage: MichelsonV1Expression | string | undefined;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}
