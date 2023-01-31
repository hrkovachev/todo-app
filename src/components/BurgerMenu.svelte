<script>
  import { sidebarVisibleStore } from "../stores";
  import SymbolButton from "./SymbolButton.svelte";
  import Menu from "svelte-material-icons/Menu.svelte";
  function handleClick() {
    sidebarVisibleStore.update((value) => !value);
  }
</script>

<SymbolButton on:click={handleClick}>
  <Menu color="white" size="28px" />
</SymbolButton>
