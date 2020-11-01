// React Select constants
export const generateContractSelectValue = (contract: string) => {
  // Return default placeholder value if there's no contract address added
  // Clears input when a user fetches contract code on 1 network and then switches to another network
  if (!contract) return { value: "Contract Address", label: "Contract Address" };
  return {
    value: contract,
    label: contract,
  };
};

// React Select constants
export const generateContractSelectOptions = (network: string) => {
  if (network === "mainnet") {
    return [
      { value: "KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9", label: "USDtz Contract" },
      { value: "Contract Address", label: "Add Contract Address" },
    ];
  } else if (network === "carthagenet") {
    return [
      { value: "KT1X19MnXuWhwzyHdEa5RHcw7XDVK1rF3G86", label: "Simple Oracle Contract" },
      { value: "KT1McL1e8UgHUMxxW9B8jxifcLKP11Pyv1wC", label: "Simple BigMap Contract" },
      { value: "Contract Address", label: "Add Contract Address" },
    ];
  } else if (network === "delphinet") {
    return [
      { value: "KT18jUxSEFsodKLM42uyyA334CXKh5YbbuJe", label: "FA 2.0 Contract" },
      { value: "KT1X3CsgqZYDYwZAmFFdFJKMQEGKrJJk1BTo", label: "FA 1.2 Contract" },
      { value: "Contract Address", label: "Add Contract Address" },
    ];
  } else {
    return [{ value: "Contract Address", label: "Add Contract Address" }];
  }
};

// React Select styles
export const contractSelectStyles = {
  menu: (provided: any) => ({
    ...provided,
    width: "95%",
  }),
  singleValue: (provided: any, state: any) => {
    const color = state.data.label === "Contract Address" ? "#aaa !important" : "#333 !important";
    return { ...provided, color };
  },
};
