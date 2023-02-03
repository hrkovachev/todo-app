<script>
  import Dropdown from "sv-bootstrap-dropdown";
  let dropdownTrigger;
</script>

<Dropdown triggerElement={dropdownTrigger}>
  <slot name="button" />
  <button type="button" class="btn-menu" bind:this={dropdownTrigger}>
    <slot name="button-content" />
  </button>
  <div class="dropdown-list" slot="DropdownMenu">
    <slot />
  </div>
</Dropdown>

<style>
  button,
  :global(.dropdown-item) {
    background: none;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--font-color);
  }
  button:hover,
  :global(.dropdown-item:hover) {
    background-color: hsla(0, 0%, 91%, 0.5);
  }
  .btn-menu:hover {
    border-radius: 10%;
  }
  .dropdown-list {
    display: flex;
    flex-direction: column;
    background-color: var(--background-color);
    border: 1px solid gray;
    border-radius: 2px;
  }
  :global(.dropdown-item) {
    padding: 0.5em;
    font-family: inherit;
    text-align: start;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 0.7em;
  }
</style>
