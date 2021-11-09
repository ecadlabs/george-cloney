import type { BeaconWallet } from "@taquito/beacon-wallet";
import type GeorgeCloney from "./cloney/GeorgeCloney";
import type { NetworkType } from "./cloney/types";

export interface InitialStore {
  georgeCloney: GeorgeCloney | undefined;
  wallet: BeaconWallet | undefined;
  networkFrom: { networkType: NetworkType; rpcUrl: string } | undefined;
  networkTo: { networkType: NetworkType; rpcUrl: string } | undefined;
  contractFrom: string | undefined;
  currentStep: "fetch" | "storage" | "originate" | "view";
}
