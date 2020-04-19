import { MichelsonV1Expression } from "@taquito/rpc";

export interface DotsProps {
  code: MichelsonV1Expression[];
  launchNetwork: string;
  signer: string;
}
