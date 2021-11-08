<script lang="ts">
  import { onMount } from "svelte";
  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css";
  import "tippy.js/themes/light.css";
  import GeorgeCloney from "../../cloney/GeorgeCloney";
  import { NetworkType, TezosContractAddress } from "../../cloney/types";
  import store from "../../store";
  import config from "../../config";

  let showNetworksList = false;
  let showContractExamples = false;
  let contractAddress: TezosContractAddress | "" = "";
  let fetching = false;

  const fetchContract = async () => {
    if (contractAddress) {
      fetching = true;

      let george = new GeorgeCloney(NetworkType.MAINNET);
      store.initGeorgeCloney(george);
      george = await george.fetch(contractAddress);
      store.updateGeorgeCloney(george);
      store.updateCurrentStep("storage");

      fetching = false;
    }
  };

  onMount(() => {
    tippy(`#fetch-contract-info`, {
      content: `
        <h3>Step 1:</h3>
        <h3>Fetch Smart Contract Code</h3>
        <p style="font-size:0.9rem">In this step, George Cloney will fetch you any smart contract code from any Tezos network</p>
        <p style="font-size:0.9rem">From here, you'll be able to see the contract's code and initial storage in Michelson in the next step.</p>
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

  #fetch-contract-info {
    cursor: help;
  }

  #network-selection-dropdown,
  #contract-examples {
    position: absolute;
    top: 70px;
    left: 0px;
    background-color: white;
    width: 100%;
    color: $main-color;
    border: solid 2px $main-color;
    border-radius: 3px;
    font-size: 1rem;
    text-align: center;
    padding: 0px;
    z-index: 999;

    p {
      margin: 0px;
      padding: 10px 0px;
      cursor: pointer;
      transition: 0.3s;
      background-color: white;

      &:hover {
        background-color: #2584ff;
        color: white;
      }

      &.selected {
        background-color: #ddecff;

        &:hover {
          background-color: #2584ff;
          color: white;
        }
      }
    }
  }
</style>

<div class="title">
  <h2>Fetch Contract Code</h2>
  <div class="bubble" id="fetch-contract-info">?</div>
</div>
<br />
<div class="form">
  <label for="network-selection">
    <span>Choose or Enter Network</span>
    <br />
    <div
      class="select-input"
      id="networks-list"
      on:click={() => {
        showNetworksList = !showNetworksList;
        showContractExamples = false;
      }}
    >
      {#if $store.networkFrom && $store.networkFrom.networkType === NetworkType.CUSTOM}
        <input
          type="text"
          id="network-selection"
          placeholder="Enter RPC URL here"
          on:input={e => store.updateNetworkFrom(NetworkType.CUSTOM, e.target.value)}
        />
      {:else}
        <input
          type="text"
          id="network-selection"
          value={$store.networkFrom ? $store.networkFrom.networkType.toLowerCase() : ""}
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
          class:selected={$store.networkFrom && $store.networkFrom.networkType === NetworkType.MAINNET}
          on:click={() => store.updateNetworkFrom(NetworkType.MAINNET, config.defaultRpcUrl[NetworkType.MAINNET])}
        >
          Mainnet
        </p>
        <p
          class:selected={$store.networkFrom && $store.networkFrom.networkType === NetworkType.HANGZHOUNET}
          on:click={() =>
            store.updateNetworkFrom(NetworkType.HANGZHOUNET, config.defaultRpcUrl[NetworkType.HANGZHOUNET])}
        >
          Hangzhounet
        </p>
        <p
          class:selected={$store.networkFrom && $store.networkFrom.networkType === NetworkType.GRANADANET}
          on:click={() => store.updateNetworkFrom(NetworkType.GRANADANET, config.defaultRpcUrl[NetworkType.GRANADANET])}
        >
          Granadanet
        </p>
        <p
          class:selected={$store.networkFrom && $store.networkFrom.networkType === NetworkType.FLORENCENET}
          on:click={() =>
            store.updateNetworkFrom(NetworkType.FLORENCENET, config.defaultRpcUrl[NetworkType.FLORENCENET])}
        >
          Florencenet
        </p>
        <p
          class:selected={$store.networkFrom && $store.networkFrom.networkType === NetworkType.CUSTOM}
          on:click={() => store.updateNetworkFrom(NetworkType.CUSTOM, "")}
        >
          Custom
        </p>
      </div>
    {/if}
  </label>
  <br />
  <label for="contract-address">
    <span>Enter Contract Address</span>
    <br />
    <div class="select-input">
      <input
        type="text"
        id="contract-address"
        value={contractAddress}
        on:input={e => (contractAddress = e.target.value)}
      />
      <button
        on:click={() => {
          showContractExamples = !showContractExamples;
          showNetworksList = false;
        }}
      >
        <span class="material-icons"> expand_more </span>
      </button>
    </div>
    {#if showContractExamples}
      <div id="contract-examples">
        <p
          class:selected={contractAddress === "KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b"}
          on:click={() => {
            contractAddress = "KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b";
            store.updateNetworkFrom(NetworkType.MAINNET, config.defaultRpcUrl[NetworkType.MAINNET]);
            showContractExamples = false;
            const input = document.getElementById("contract-address");
            setTimeout(() => input.blur(), 10);
          }}
        >
          Plenty token (FA1.2 token)
        </p>
        <p
          class:selected={contractAddress === "KT1LRboPna9yQY9BrjtQYDS1DVxhKESK4VVd"}
          on:click={() => {
            contractAddress = "KT1LRboPna9yQY9BrjtQYDS1DVxhKESK4VVd";
            store.updateNetworkFrom(NetworkType.MAINNET, config.defaultRpcUrl[NetworkType.MAINNET]);
            showContractExamples = false;
            const input = document.getElementById("contract-address");
            setTimeout(() => input.blur(), 10);
          }}
        >
          Wrap token (FA2 token)
        </p>
      </div>
    {/if}
  </label>
  <br />
  <button class="submit" disabled={!$store.networkFrom || !contractAddress || fetching} on:click={fetchContract}>
    {#if fetching}
      <span class="material-icons loading"> settings </span>
    {:else}
      FETCH
    {/if}
  </button>
</div>
