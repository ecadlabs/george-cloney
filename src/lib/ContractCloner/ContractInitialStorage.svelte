<script lang="ts">
  import { onMount } from "svelte";
  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css";
  import "tippy.js/themes/light.css";
  import BigNumber from "bignumber.js";
  import { BigMapAbstraction, MichelsonMap } from "@taquito/taquito";
  import store from "../../store";
  import { StorageType } from "../../cloney/types";

  let storageType: StorageType = StorageType.EMPTY;
  let customStorage = false;
  let customStorageValues = [];
  let settingStorage = false;

  const setStorage = async () => {
    if (storageType === StorageType.EMPTY) {
      $store.georgeCloney.addStorage(StorageType.EMPTY);
    } else if (storageType === StorageType.CURRENT) {
      $store.georgeCloney.addStorage(StorageType.CURRENT);
    } else if (storageType === StorageType.CUSTOM) {
      const newStorage = { ...$store.georgeCloney.contractToOriginate.storage };
      customStorageValues.forEach(([key, val, valType]) => {
        if (valType === "bigmap") {
          newStorage[key] = new MichelsonMap();
        } else {
          newStorage[key] = val;
        }
      });
      $store.georgeCloney.addStorage(StorageType.CUSTOM, newStorage);
    }
  };

  const setNewStorage = async () => {
    customStorage = true;

    Object.entries($store.georgeCloney.contractToOriginate.storage).forEach(([name, val]) => {
      if (["string", "number", "boolean"].includes(typeof val)) {
        customStorageValues = [...customStorageValues, [name, val, typeof val]];
      } else if (BigNumber.isBigNumber(val)) {
        customStorageValues = [...customStorageValues, [name, val.toNumber(), "number"]];
      } else if (val instanceof BigMapAbstraction) {
        customStorageValues = [...customStorageValues, [name, val.toString(), "bigmap"]];
      }
    });
  };

  onMount(() => {
    tippy(`#initial-storage-info`, {
      content: `
        <h3>Initial Storage</h3>
        <p style="font-size:0.9rem">In this step, George Cloney will let you choose between using the current storage of the contract to originate or using a custom storage for the new contract.</p>
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

  #initial-storage-info {
    cursor: help;
  }

  .storage-type-select {
    display: flex;
    width: 90%;

    input[type="radio"] {
      position: fixed;
      opacity: 0;
      pointer-events: none;
    }

    label {
      cursor: pointer;

      .material-icons {
        vertical-align: bottom;
      }
    }
  }

  .input-storage-values {
    padding: 5px;
    width: 90%;
    text-align: center;
    display: flex;
    justify-content: space-between;

    & > div {
      width: 50%;
      text-align: left;
    }

    input[type="text"] {
      width: 100%;
    }
  }
</style>

{#if customStorage}
  <div class="title">
    <h2>Set Custom Storage</h2>
  </div>
  <br />
  <div class="form">
    {#each customStorageValues as [name, val, valType], index}
      <div class="input-storage-values">
        <div>{name}:</div>
        <div>
          {#if valType === "boolean"}
            <label
              for={`${name}-${index}-select-true`}
              on:click={() => (customStorageValues[index] = [name, true, valType])}
            >
              True
              <input type="radio" name={`${name}-${index}-select`} id={`${name}-${index}-select-true`} checked={val} />
            </label>
            <label
              for={`${name}-${index}-select-false`}
              on:click={() => (customStorageValues[index] = [name, false, valType])}
            >
              False
              <input
                type="radio"
                name={`${name}-${index}-select`}
                id={`${name}-${index}-select-false`}
                checked={!val}
              />
            </label>
          {:else if valType === "bigmap"}
            <div>Bigmap</div>
          {:else}
            <label for={`${name}-${index}`}>
              <input
                type="text"
                id={`${name}-${index}`}
                value={val}
                on:input={e => (customStorageValues[index] = [name, e.target.value, valType])}
              />
            </label>
          {/if}
        </div>
      </div>
    {/each}
    <br />
    <button class="submit" on:click={setStorage}>
      {#if settingStorage}
        <span class="material-icons loading"> settings </span>
      {:else}
        CONFIRM
      {/if}
    </button>
  </div>
{:else}
  <div class="title">
    <h2>Set Initial Storage</h2>
    <div class="bubble" id="initial-storage-info">?</div>
  </div>
  <br />
  <div class="form">
    <div class="storage-type-select">
      <label for="set-empty-storage-select" on:click={() => (storageType = StorageType.EMPTY)}>
        <input
          type="radio"
          name="set-storage"
          id="set-empty-storage-select"
          checked={storageType === StorageType.EMPTY}
        />
        {#if storageType === StorageType.EMPTY}
          <span class="material-icons"> check_circle_outline </span>
        {:else}
          <span class="material-icons"> radio_button_unchecked </span>
        {/if}
        Empty storage
      </label>
      <label for="set-current-storage-select" on:click={() => (storageType = StorageType.CURRENT)}>
        <input
          type="radio"
          name="set-storage"
          id="set-current-storage-select"
          checked={storageType === StorageType.CURRENT}
        />
        {#if storageType === StorageType.CURRENT}
          <span class="material-icons"> check_circle_outline </span>
        {:else}
          <span class="material-icons"> radio_button_unchecked </span>
        {/if}
        Current storage
      </label>
      <label for="set-custom-storage-select" on:click={() => (storageType = StorageType.CUSTOM)}>
        <input
          type="radio"
          name="set-storage"
          id="set-custom-storage-select"
          checked={storageType === StorageType.CUSTOM}
        />
        {#if storageType === StorageType.CUSTOM}
          <span class="material-icons"> check_circle_outline </span>
        {:else}
          <span class="material-icons"> radio_button_unchecked </span>
        {/if}
        Custom storage
      </label>
    </div>
    {#if storageType === StorageType.EMPTY}
      <div>This will originate the new contract with an empty storage.</div>
      <br />
      <button class="submit" on:click={setStorage}>
        {#if settingStorage}
          <span class="material-icons loading"> settings </span>
        {:else}
          CONFIRM
        {/if}
      </button>
    {:else if storageType === StorageType.CURRENT}
      <div>This will originate the new contract with the current storage.</div>
      <div style="font-size:0.8rem;font-style: italic">Note: the values present in bigmaps will not be copied.</div>
      <br />
      <button class="submit" on:click={setStorage}>
        {#if settingStorage}
          <span class="material-icons loading"> settings </span>
        {:else}
          CONFIRM
        {/if}
      </button>
    {:else if storageType === StorageType.CUSTOM}
      <div>Set your own values for the contract that will be originated.</div>
      <div style="font-size:0.8rem;font-style: italic">Note: the bigmaps in the contract will be originated empty.</div>
      <br />
      <button class="submit" on:click={setNewStorage}>
        {#if settingStorage}
          <span class="material-icons loading"> settings </span>
        {:else}
          SET NEW STORAGE
        {/if}
      </button>
    {/if}
  </div>
{/if}
