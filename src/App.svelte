<script lang="ts">
  import { onMount } from "svelte";
  import { TezosToolkit } from "@taquito/taquito";
  import { BeaconWallet } from "@taquito/beacon-wallet";
  import { NetworkType } from "@airgap/beacon-sdk";
  import Header from "./lib/Header.svelte";
  import Body from "./lib/Body.svelte";

  let Tezos: TezosToolkit;
  let wallet: BeaconWallet;

  const rpcUrl = "https://mainnet.api.tez.ie";

  const connect = async () => {
    try {
      wallet = new BeaconWallet({
        name: "George Cloney",
        preferredNetwork: NetworkType.MAINNET
      });
      await wallet.requestPermissions({
        network: {
          type: NetworkType.MAINNET,
          rpcUrl
        }
      });
      Tezos.setWalletProvider(wallet);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = () => {
    wallet.client.destroy();
    wallet = undefined;
  };

  onMount(async () => {
    Tezos = new TezosToolkit(rpcUrl);
  });
</script>

<style lang="scss">
</style>

<Header />
<Body />
