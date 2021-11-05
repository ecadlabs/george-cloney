import { writable } from "svelte/store";
import type GeorgeCloney from "./cloney/GeorgeCloney";
import type { NetworkType } from "./cloney/types";

interface InitialStore {
  georgeCloney: GeorgeCloney | undefined;
  networkFrom: NetworkType | undefined;
  networkTo: NetworkType | undefined;
  contractFrom: string | undefined;
  currentStep: "fetch" | "storage" | "originate" | "view";
}

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
  updateNetworkFrom: (networkFrom: NetworkType) =>
    store.update(store => ({ ...store, networkFrom })),
  updateNetworkTo: (networkTo: NetworkType) =>
    store.update(store => ({ ...store, networkTo })),
  updateCurrentStep: (step: InitialStore["currentStep"]) =>
    store.update(store => ({ ...store, currentStep: step }))
};

export default state;
