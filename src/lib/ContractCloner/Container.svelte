<script lang="ts">
  import StepsCounter from "./StepsCounter.svelte";
  import store from "../../store";
  import ContractFetchForm from "./ContractFetchForm.svelte";
  import ContractInitialStorage from "./ContractInitialStorage.svelte";
  import type { InitialStore } from "../../types";

  const containerMinWidth: { [p in InitialStore["currentStep"]]: string } = {
    fetch: "25%",
    storage: "45%",
    originate: "25%",
    view: "25%"
  };
</script>

<style lang="scss">
  @import "../../styles/settings.scss";

  .cloney-container {
    min-width: 25%;
    border: 5px solid $main-color;
    border-radius: 3px;
    margin: 20px;
    padding: 20px;
    box-shadow: 0 0 20px rgb(0, 0, 0 / 60%);
  }
</style>

<StepsCounter />
<div class="cloney-container" style={`min-width:${containerMinWidth[$store.currentStep]}`}>
  {#if $store.currentStep === "fetch"}
    <ContractFetchForm />
  {:else if $store.currentStep === "storage"}
    <ContractInitialStorage />
  {:else if $store.currentStep === "originate"}
    <div>Originate contract</div>
  {:else if $store.currentStep === "view"}
    <div>View new contract</div>
  {/if}
</div>
