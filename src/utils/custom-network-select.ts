// React Select constants
export const generateSelectValue = (network: string) => {
  return {
    value: network,
    label: network.includes("http") ? network : network.charAt(0).toUpperCase() + network.slice(1),
  };
};

// React Select constants
export const selectOptions = [
  { value: "mainnet", label: "Mainnet" },
  { value: "carthagenet", label: "Carthagenet" },
  { value: "http://localhost:9999", label: "Flextesa Default" },
  { value: "Start typing Custom Network", label: "Custom" },
];

// React Select styles
export const selectStyles = {
  singleValue: (provided: any, state: any) => {
    const color = state.data.label === "Start typing Custom Network" ? "#aaa !important" : "#333 !important";
    return { ...provided, color };
  },
};
