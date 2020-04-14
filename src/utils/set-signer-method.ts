import { HttpBackend } from "@taquito/http-utils";
import { RemoteSigner } from "@taquito/remote-signer";
// import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezBridgeSigner } from "@taquito/tezbridge-signer";
import { Tezos } from "@taquito/taquito";
import { Dispatch, SetStateAction } from "react";

const setSignerMethod = async (
  signer: string,
  contractNetwork: string,
  launchNetwork: string,
  code?: any,
  storage?: any,
  setLoading?: Dispatch<SetStateAction<boolean>>,
  showSnackbar?: Dispatch<SetStateAction<boolean>>,
  setLoadingMessage?: Dispatch<SetStateAction<string>>,
  setTxnAddress?: Dispatch<SetStateAction<string>>,
  setError?: Dispatch<SetStateAction<string>>
) => {
  switch (signer) {
    case "ephemeral":
      try {
        const httpClient = new HttpBackend();
        const { id, pkh } = await httpClient.createRequest({
          url: `https://api.tez.ie/keys/${launchNetwork ? launchNetwork : contractNetwork}/ephemeral`,
          method: "POST",
          headers: { Authorization: "Bearer taquito-example" },
        });
        const signer = new RemoteSigner(
          pkh,
          `https://api.tez.ie/keys/${launchNetwork ? launchNetwork : contractNetwork}/ephemeral/${id}/`,
          {
            headers: { Authorization: "Bearer taquito-example" },
          }
        );
        await Tezos.setSignerProvider(signer);
      } catch (e) {
        setError && setError(e.message);
      }
      break;

    case "tezbridge":
      Tezos.setProvider({
        rpc: `https://api.tez.ie/rpc/${launchNetwork ? launchNetwork : contractNetwork}`,
        signer: new TezBridgeSigner(),
      });
      // Originate a new contract
      Tezos.contract
        .originate({
          code: code as any,
          init: storage as any,
        })
        .then((originationOp) => {
          return originationOp.contract();
        })
        .then((contract) => {
          // Remove contract launch snackbar message
          setLoading && setLoading(false);
          showSnackbar && showSnackbar(false);
          // Add block explorer snackbar message
          setLoadingMessage && setLoadingMessage("");
          setTxnAddress && setTxnAddress(contract.address);
          showSnackbar && showSnackbar(true);
        })
        .catch((e) => {
          throw e;
        });
      break;

    case "beacon":
      // const wallet = new BeaconWallet({ name: 'test' })
      // await wallet.requestPermissions()
      // this.taquito.setProvider({ rpc: this.taquito.rpc, wallet });
      // }
      break;

    default:
      break;
  }
};

export default setSignerMethod;
