<script lang="ts">
  import { onMount } from "svelte";
  import { BeaconWallet } from "@taquito/beacon-wallet";
  import { NetworkType, BeaconEvent, defaultEventCallbacks } from "@airgap/beacon-sdk";
  import store from "../../store";
  import config from "../../config";

  let userAddress = "";
  const walletOptions = {
    name: "George Cloney",
    preferredNetwork: NetworkType.MAINNET,
    disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
    eventHandlers: {
      // To keep the pairing alert, we have to add the following default event handlers back
      [BeaconEvent.PAIR_INIT]: {
        handler: defaultEventCallbacks.PAIR_INIT
      },
      [BeaconEvent.PAIR_SUCCESS]: {
        handler: defaultEventCallbacks.PAIR_SUCCESS
      }
    }
  };

  const connect = async () => {
    if (!$store.wallet) {
      store.updateWallet(new BeaconWallet(walletOptions as any));
    }

    try {
      await $store.wallet.requestPermissions({
        network: {
          type: NetworkType.MAINNET,
          rpcUrl: config.defaultRpcUrl.MAINNET
        }
      });
      userAddress = await $store.wallet.getPKH();
    } catch (err) {
      console.error(err);
    }
  };

  const disconnect = () => {
    $store.wallet.client.destroy();
    userAddress = "";
    store.updateWallet(undefined);
  };

  onMount(async () => {
    const wallet = new BeaconWallet(walletOptions as any);
    const activeAccount = await wallet.client.getActiveAccount();
    if (activeAccount) {
      userAddress = await wallet.getPKH();
    }
    store.updateWallet(wallet);
  });
</script>

{#if !userAddress}
  <button class="wallet" on:click={connect}>
    <span class="material-icons"> login </span>
    &nbsp; Connect
  </button>
{:else}
  <button class="wallet" on:click={disconnect}>
    <span class="material-icons"> account_balance_wallet </span>
    &nbsp; {userAddress.slice(0, 5)}...{userAddress.slice(-5)}
  </button>
{/if}
