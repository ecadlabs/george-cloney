<style lang="scss">
  $side-padding: 20px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    width: calc(100% - #{$side-padding * 2});
    box-shadow: 0 0.5rem 1rem 0 rgba(44, 51, 73, 0.1);
    padding: 0px $side-padding;

    img {
      vertical-align: middle;

      &.github {
        height: 60px;
      }
      &.cloney {
        height: 55px;
        width: 60px;
      }
    }
  }
</style>

<header>
  <div>
    <img class="cloney" src="images/george-cloney.png" alt="george-cloney" />
  </div>
  <div>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/ecadlabs/george-cloney"
    >
      <img
        class="github"
        alt="Github logo"
        height="55"
        width="100"
        src="images/github.jpg"
      />
    </a>
  </div>
</header>
