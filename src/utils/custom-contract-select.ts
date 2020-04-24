// React Select constants
export const generateContractSelectValue = (contract: string) => {
  return {
    value: contract,
    label: contract,
  };
};

// React Select constants
export const generateContractSelectOptions = (network: string) => {
  if (network === "mainnet") {
    return [
      { value: "KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn", label: "tzBTC Contract" },
      { value: "Insert contract address", label: "Custom" },
    ];
  } else if (network === "carthagenet") {
    return [
      { value: "KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn", label: "tzBTC Contract" },
      { value: "KT1X19MnXuWhwzyHdEa5RHcw7XDVK1rF3G86", label: "Simple Oracle Contract" },
      { value: "Insert contract address", label: "Custom" },
    ];
  } else {
    return [{ value: "Insert contract address", label: "Custom" }];
  }
};

// React Select styles
export const contractSelectStyles = {
  singleValue: (provided: any, state: any) => {
    const color = state.data.label === "Insert contract address" ? "#aaa !important" : "#333 !important";
    return { ...provided, color };
  },
};
