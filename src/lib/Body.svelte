<script lang="ts">
  import ContractCloner from "./ContractCloner/Container.svelte";
</script>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    h3 {
      font-size: 18px;
      text-align: center;
    }
  }
</style>

<main>
  <img src="images/george-cloney-title.png" alt="george-cloney-title" />
  <h3>
    George Cloney will find any Tezos Smart Contract and clone it for you.
    <br />
    Great for testing and exploring.
  </h3>
  <ContractCloner />
</main>
