export type TezosContractAddress = `KT1${string}`;

export enum NetworkType {
  "MAINNET" = "MAINNET",
  "HANGZHOUNET" = "HANGZHOUNET",
  "GRANADANET" = "GRANADANET",
  "FLORENCENET" = "FLORENCENET",
  "CUSTOM" = "CUSTOM"
}

export interface Config {
  defaultRpcUrls: { [p in Exclude<NetworkType, NetworkType.CUSTOM>]: string };
}

export enum StorageType {
  "EMPTY" = "EMPTY",
  "CURRENT" = "CURRENT",
  "CUSTOM" = "CUSTOM"
}
