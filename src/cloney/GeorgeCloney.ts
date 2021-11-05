import { TezosToolkit } from "@taquito/taquito";
import { validateContractAddress } from "@taquito/utils";
import type { MichelsonV1Expression } from "@taquito/rpc";
import type { NetworkType, TezosContractAddress } from "./types";
import config from "./config";

export default class GeorgeCloney {
  public networkFrom: NetworkType;
  public networkFromUrl: string;
  public networkTo: NetworkType;
  public networkToUrl: string;
  private TezosFrom: TezosToolkit;
  private TezosTo: TezosToolkit;
  private contractToOriginate: MichelsonV1Expression[] = [];

  constructor(
    from: NetworkType,
    to?: NetworkType,
    options?: { fromUrl?: string; toUrl?: string }
  ) {
    this.networkFrom = from;

    if (to) {
      this.networkTo = to;
    }
    // sets RPC URL of existing contract
    if (options?.fromUrl) {
      this.networkFromUrl = options.fromUrl;
    } else {
      this.networkFromUrl = config.defaultRpcUrls[from];
    }
    // sets RPC URL for contract to be created
    if (options?.toUrl) {
      this.networkToUrl = options.toUrl;
    } else {
      this.networkToUrl = config.defaultRpcUrls[to];
    }

    // creates both instances of the TezosToolkit
    this.TezosFrom = new TezosToolkit(this.networkFromUrl);
    this.TezosTo = new TezosToolkit(this.networkToUrl);
  }

  // fetches the code and the storage of the source contract
  public async fetch(
    contractAddress: TezosContractAddress
  ): Promise<GeorgeCloney> {
    // if provided contract address is invalid
    if (validateContractAddress(contractAddress) !== 3) {
      throw { message: "Invalid contract address", details: contractAddress };
    }

    try {
      const contract = await this.TezosFrom.contract.at(contractAddress);
      this.contractToOriginate = contract.script.code;

      return this;
    } catch (error) {
      throw error;
    }
  }

  // uses the current storage for the fetched contract
  public useStorage() {}

  // uses custom storage for the fetched contract
  public addStorage() {}

  // copies data from bigmap in source contract
  public copyBigMap(bigmapId: number) {}

  // originates a new contract
  public clone() {}

  // clears data related to previously fetched contract
  public clear() {}
}
