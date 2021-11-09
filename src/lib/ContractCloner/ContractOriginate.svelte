<script lang="ts">
  import { onMount } from "svelte";
  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css";
  import "tippy.js/themes/light.css";
  import store from "../../store";
  import { NetworkType } from "../../cloney/types";
  import config from "../../config";

  let showNetworksList = false;
  let originatingContract = false;

  const originateContract = async () => {
    originatingContract = true;
    try {
      const contractAddress = await $store.georgeCloney.clone();
      console.log(contractAddress);
    } catch (error) {
      console.error(error);
    } finally {
      originatingContract = false;
    }
  };

  onMount(() => {
    tippy(`#origination-info`, {
      content: `
        <h3>Origination of the new contract</h3>
        <p style="font-size:0.9rem">In this step, George Cloney will originate a new contract based on the original contract code and the storage you selected.</p>
        `,
      allowHTML: true,
      placement: "bottom",
      theme: "light"
    });
  });
</script>

<style lang="scss">
  @import "../../styles/settings.scss";

  .title {
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      margin: 0px;
    }
  }

  #origination-info {
    cursor: help;
  }
</style>

<div class="title">
  <h2>Originate Contract</h2>
  <div class="bubble" id="origination-info">?</div>
</div>
<br />
<div class="form">
  <div>
    You are about to originate <a
      href={`https://better-call.dev/${$store.georgeCloney.networkFrom.toLowerCase()}/${
        $store.georgeCloney.contractToOriginate.address
      }/operations`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      >{$store.georgeCloney.contractToOriginate.address.slice(
        0,
        5
      )}...{$store.georgeCloney.contractToOriginate.address.slice(-5)}</a
    >
    from {$store.georgeCloney.networkFrom}.
  </div>
  <br />
  <div>Select a network to originate the new contract:</div>
  <br />
  <label for="network-selection">
    <span>Choose or Enter Network</span>
    <br />
    <div
      class="select-input"
      id="networks-list"
      on:click={() => {
        showNetworksList = !showNetworksList;
      }}
    >
      {#if $store.networkTo && $store.networkTo.networkType === NetworkType.CUSTOM}
        <input
          type="text"
          id="network-selection"
          placeholder="Enter RPC URL here"
          on:input={e => {
            const val = e.target.value;
            store.updateNetworkTo(NetworkType.CUSTOM, val);
            $store.georgeCloney.setTargetNetwork(NetworkType.CUSTOM, val);
          }}
        />
      {:else}
        <input
          type="text"
          id="network-selection"
          value={$store.networkTo ? $store.networkTo.networkType.toLowerCase() : ""}
          readonly
        />
      {/if}
      <button>
        <span class="material-icons"> expand_more </span>
      </button>
    </div>
    {#if showNetworksList}
      <div id="network-selection-dropdown">
        <p
          class:selected={$store.networkTo && $store.networkTo.networkType === NetworkType.MAINNET}
          on:click={() => {
            store.updateNetworkTo(NetworkType.MAINNET, config.defaultRpcUrl[NetworkType.MAINNET]);
            $store.georgeCloney.setTargetNetwork(NetworkType.MAINNET);
          }}
        >
          Mainnet
        </p>
        <p
          class:selected={$store.networkTo && $store.networkTo.networkType === NetworkType.HANGZHOUNET}
          on:click={() => {
            store.updateNetworkTo(NetworkType.HANGZHOUNET, config.defaultRpcUrl[NetworkType.HANGZHOUNET]);
            $store.georgeCloney.setTargetNetwork(NetworkType.HANGZHOUNET);
          }}
        >
          Hangzhounet
        </p>
        <p
          class:selected={$store.networkTo && $store.networkTo.networkType === NetworkType.GRANADANET}
          on:click={() => {
            store.updateNetworkTo(NetworkType.GRANADANET, config.defaultRpcUrl[NetworkType.GRANADANET]);
            $store.georgeCloney.setTargetNetwork(NetworkType.GRANADANET);
          }}
        >
          Granadanet
        </p>
        <p
          class:selected={$store.networkTo && $store.networkTo.networkType === NetworkType.FLORENCENET}
          on:click={() => {
            store.updateNetworkTo(NetworkType.FLORENCENET, config.defaultRpcUrl[NetworkType.FLORENCENET]);
            $store.georgeCloney.setTargetNetwork(NetworkType.FLORENCENET);
          }}
        >
          Florencenet
        </p>
        <p
          class:selected={$store.networkTo && $store.networkTo.networkType === NetworkType.CUSTOM}
          on:click={() => {
            store.updateNetworkTo(NetworkType.CUSTOM, "");
            $store.georgeCloney.setTargetNetwork(NetworkType.CUSTOM);
          }}
        >
          Custom
        </p>
      </div>
    {/if}
  </label><br />
  <button class="submit" on:click={originateContract}>
    {#if originatingContract}
      <span class="material-icons loading"> settings </span>
    {:else}
      ORIGINATE
    {/if}
  </button>
</div>
