import { NetworkType, TEST_NETWORK } from "./constants";

const requestBeaconPermissions = async (beaconWallet: any, launchNetwork: string): Promise<void> => {
  if (launchNetwork === "carthagenet") {
    await beaconWallet.requestPermissions({
      network: {
        type: NetworkType.CARTHAGENET,
        name: "Carthagenet",
        rpcUrl: `https://api.tez.ie/rpc/${TEST_NETWORK}`,
      },
    });
  } else if (launchNetwork === "mainnet") {
    await beaconWallet.requestPermissions({
      network: {
        type: NetworkType.MAINNET,
        name: "Mainnet",
        rpcUrl: `https://api.tez.ie/rpc/mainnet`,
      },
    });
  } else {
    await beaconWallet.requestPermissions({
      network: {
        type: NetworkType.CUSTOM,
        name: "Custom",
        rpcUrl: launchNetwork,
      },
    });
  }
};

export default requestBeaconPermissions;
