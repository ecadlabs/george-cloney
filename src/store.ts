import { writable } from "svelte/store";
import type GeorgeCloney from "./cloney/GeorgeCloney";
import type { NetworkType } from "./cloney/types";
import type { InitialStore } from "./types";

const initialStore: InitialStore = {
  georgeCloney: undefined,
  contractFrom: undefined,
  networkFrom: undefined,
  networkTo: undefined,
  currentStep: "fetch"
};

const store = writable(initialStore);

const state = {
  subscribe: store.subscribe,
  initGeorgeCloney: (g: GeorgeCloney) =>
    store.update(store => {
      if (!store.georgeCloney) {
        return { ...store, georgeCloney: g };
      } else {
        throw "A George Cloney instance already exists";
      }
    }),
  updateGeorgeCloney: (g: GeorgeCloney) =>
    store.update(store => {
      if (!store.georgeCloney) {
        throw "No George Cloney instance";
      } else {
        return { ...store, georgeCloney: g };
      }
    }),
  updateNetworkFrom: (networkFrom: NetworkType, rpcUrl: string) =>
    store.update(store => ({ ...store, networkFrom: { networkType: networkFrom, rpcUrl } })),
  updateNetworkTo: (networkTo: NetworkType, rpcUrl: string) =>
    store.update(store => ({ ...store, networkTo: { networkType: networkTo, rpcUrl } })),
  updateCurrentStep: (step: InitialStore["currentStep"]) => store.update(store => ({ ...store, currentStep: step }))
};

export default state;
