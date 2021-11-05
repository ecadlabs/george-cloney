<script lang="ts">
  let activeBubble = 1;
</script>

<style lang="scss">
  .steps {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    width: 40%;
    margin: 30px 0px;

    .step {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .step-title {
        font-weight: bold;
        width: 100px;
        text-align: center;
      }
    }
  }
</style>

<div class="steps">
  <div class="step">
    <div class="bubble" class:active={activeBubble === 1}>1</div>
    <div class="step-title">Fetch Contract</div>
  </div>
  <div class="step">
    <div class="bubble" class:active={activeBubble === 2}>2</div>
    <div class="step-title">Review Contract</div>
  </div>
  <div class="step">
    <div class="bubble" class:active={activeBubble === 3}>3</div>
    <div class="step-title">Originate New Contract</div>
  </div>
  <div class="step">
    <div class="bubble" class:active={activeBubble === 4}>4</div>
    <div class="step-title">View New Contract</div>
  </div>
</div>
