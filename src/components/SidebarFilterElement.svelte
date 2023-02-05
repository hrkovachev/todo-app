<script>
  import { sidebarVisibleStore, mobileDeviceStore } from "../stores";
  export let Icon;
  export let title;
  export let count;
  export let color;
  function hideMobileSideMenu() {
    if ($mobileDeviceStore) $sidebarVisibleStore = false;
  }
</script>

<div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="filter" on:click={hideMobileSideMenu}>
    <span class="filter-name">
      <span class="icon"
        ><svelte:component this={Icon} {color} size="22" /></span
      >
      {title}
    </span>
    <div><span>{count}</span></div>
  </div>
</div>

<style>
  .filter {
    height: 2.1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.7em;
    user-select: none;
  }
  .filter:hover {
    background-color: #eeeeee;
    border-radius: 5px;
  }
  .filter-name {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .icon {
    margin-right: 0.5em;
  }
</style>
