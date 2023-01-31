<script>
  import Topbar from "./components/Topbar.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Workspace from "./components/Workspace.svelte";
  import ScreenSizeObserver from "./components/ScreenSizeObserver.svelte";
  import { newProjectModal } from "./stores";
  import AddNewProject from "./components/AddNewProject.svelte";
</script>

<main>
  <ScreenSizeObserver />
  <Topbar />
  <div class="content-wrapper">
    {#if $newProjectModal}
      <AddNewProject />
    {/if}
    <Sidebar />
    <Workspace />
  </div>
</main>

<style>
  :global(html) {
    box-sizing: border-box;
  }
  :global(*),
  :global(*):before,
  :global(*):after {
    box-sizing: inherit;
  }
  .content-wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }
</style>
