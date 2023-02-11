<script>
  import Topbar from "./components/Topbar.svelte";
  import Sidebar from "./components/Sidebar.svelte";
  import Workspace from "./components/Workspace.svelte";
  import ScreenSizeObserver from "./components/ScreenSizeObserver.svelte";
  import {
    newProjectModal,
    editProjectModal,
    editProjectId,
    newTaskModal,
    editTaskModal,
    editTaskId,
  } from "./stores";
  import { confirmModalVisibility } from "./confirmModalStores";
  import AddNewProject from "./components/AddNewProject.svelte";
  import AddEditTask from "./components/AddEditTask.svelte";
  import ConfirmModal from "./components/ConfirmModal.svelte";
</script>

<main>
  <ScreenSizeObserver />
  <Topbar />
  <div class="content-wrapper">
    {#if $newProjectModal}
      <AddNewProject />
    {:else if $editProjectModal}
      <AddNewProject editMode={true} projectId={$editProjectId} />
    {:else if $newTaskModal}
      <AddEditTask />
    {:else if $editTaskModal}
      <AddEditTask editMode={true} taskId={$editTaskId} />
    {:else if $confirmModalVisibility}
      <ConfirmModal />
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
