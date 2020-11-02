import { TEST_NETWORKS } from "./constants";

// React Select constants
export const generateNetworkSelectValue = (network: string) => {
  return {
    value: network,
    label: network.includes("http") ? network : network.charAt(0).toUpperCase() + network.slice(1),
  };
};

const generateNetworkSelectOptions = (testNetworks: Array<string>): Array<{ value: string; label: string }> => {
  const testnets = testNetworks.map((network) => {
    return {
      value: network,
      label: network.replace(/^./, network[0].toUpperCase()),
    };
  });
  const networkOptions = [
    ...testnets,
    { value: "mainnet", label: "Mainnet" },
    { value: "http://localhost:9999", label: "Flextesa Default" },
    { value: "Start typing Custom Network", label: "Add Custom Network" },
  ];
  return networkOptions;
};

// React Select constants
export const networkSelectOptions = generateNetworkSelectOptions(TEST_NETWORKS);

// React Select styles
export const networkSelectStyles = {
  menu: (provided: any) => ({
    ...provided,
    width: "95%",
  }),
  singleValue: (provided: any, state: any) => {
    const color = state.data.label === "Start typing Custom Network" ? "#aaa !important" : "#333 !important";
    return { ...provided, color };
  },
};
