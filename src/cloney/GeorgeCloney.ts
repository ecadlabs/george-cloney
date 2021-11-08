import { TezosToolkit, BigMapAbstraction, MichelsonMap } from "@taquito/taquito";
import { validateContractAddress } from "@taquito/utils";
import type { MichelsonV1Expression } from "@taquito/rpc";
import BigNumber from "bignumber.js";
import { NetworkType, TezosContractAddress, StorageType } from "./types";
import config from "./config";

export default class GeorgeCloney {
  public networkFrom: NetworkType;
  public networkFromUrl: string;
  public networkTo: NetworkType;
  public networkToUrl: string;
  public contractToOriginate: { rpcData: MichelsonV1Expression[]; storage: any } | undefined;
  private TezosFrom: TezosToolkit;
  private TezosTo: TezosToolkit;

  constructor(from: NetworkType, to?: NetworkType, options?: { fromUrl?: string; toUrl?: string }) {
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
  public async fetch(contractAddress: TezosContractAddress): Promise<GeorgeCloney> {
    // if provided contract address is invalid
    if (validateContractAddress(contractAddress) !== 3) {
      throw { message: "Invalid contract address", details: contractAddress };
    }

    try {
      const contract = await this.TezosFrom.contract.at(contractAddress);
      const storage: any = await contract.storage();
      const newContract = { rpcData: contract.script.code, storage };
      this.contractToOriginate = newContract;

      return this;
    } catch (error) {
      throw error;
    }
  }

  // add storage for the fetched contract according to user's choice
  public addStorage(storageType: StorageType, storage?: any) {
    if (!this.contractToOriginate || (this.contractToOriginate && !this.contractToOriginate.storage)) {
      throw "Current storage has not been fetched";
    }

    const newStorage = { ...this.contractToOriginate.storage };
    if (storageType === StorageType.EMPTY) {
      // empty storage
      Object.entries(this.contractToOriginate.storage).forEach(([key, val]) => {
        if (typeof val === "string") {
          newStorage[key] = "";
        } else if (typeof val === "number" || BigNumber.isBigNumber(val)) {
          newStorage[key] = 0;
        } else if (typeof val === "boolean") {
          newStorage[key] = false;
        } else if (val instanceof BigMapAbstraction) {
          newStorage[key] = new MichelsonMap();
        }
      });
    } else if (storageType === StorageType.CURRENT) {
      // current storage
      Object.entries(this.contractToOriginate.storage).forEach(([key, val]) => {
        if (val instanceof BigMapAbstraction) {
          newStorage[key] = new MichelsonMap();
        } else {
          newStorage[key] = val;
        }
      });
    } else if (storageType === StorageType.CUSTOM) {
      // custom storage
      if (!storage) {
        throw "No custom storage provided";
      }

      // compares the provided storage with the saved storage
      const savedStorageKeys = Object.keys(this.contractToOriginate.storage);
      const providedStorageKeys = Object.keys(storage);
      if (savedStorageKeys.length !== providedStorageKeys.length) {
        throw "The provided storage keys don't match the original storage keys";
      } else {
        const sameKeys = savedStorageKeys.map(key => providedStorageKeys.includes(key)).reduce((a, b) => a && b);
        if (!sameKeys) {
          throw "Different keys in original storage and provided storage";
        } else {
          Object.entries(storage).forEach(([key, val]) => {
            if (val instanceof BigMapAbstraction) {
              newStorage[key] = new MichelsonMap();
            } else {
              newStorage[key] = val;
            }
          });
        }
      }
    }
    console.log(newStorage);
  }

  // copies data from bigmap in source contract
  public copyBigMap(bigmapId: number) {}

  // originates a new contract
  public clone() {}

  // clears data related to previously fetched contract
  public clear() {}
}
