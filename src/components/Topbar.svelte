<script>
  import BurgerMenu from "./BurgerMenu.svelte";
</script>

<div id="top-bar">
  <BurgerMenu />
</div>

<style>
  #top-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--topbar-height);
    background-color: var(--accent-color-1);
    display: flex;
    align-items: center;
    z-index: 200;
    padding-left: 18px;
  }
</style>
