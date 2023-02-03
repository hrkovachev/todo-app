<script>
  import { flip } from "svelte/animate";
  import { _ } from "lodash";
  import Dots from "svelte-material-icons/DotsHorizontalCircleOutline.svelte";

  import OptionsDropDown from "./OptionsDropDown.svelte";
  import EditPencil from "svelte-material-icons/PencilOutline.svelte";
  import DeleteSymbol from "svelte-material-icons/DeleteForeverOutline.svelte";
  import Plus from "svelte-material-icons/Plus.svelte";

  import {
    sidebarVisibleStore,
    mobileDeviceStore,
    selectedProjectStore,
    editProjectModal,
    editProjectId,
  } from "../stores";
  import { projectsStore } from "../app-logic/appLogicStores";

  import { appManager as am } from "../app-logic/AppManager";
  import TaskCard from "./TaskCard.svelte";

  let tasks;
  let heading;

  function handleEditProject() {
    $editProjectModal = true;
    $editProjectId = $selectedProjectStore[1];
  }

  $: if ($selectedProjectStore[0]) {
    let currProject = $projectsStore.find(
      (project) => project.projectId === $selectedProjectStore[1]
    );
    tasks = currProject.tasks;
    heading = currProject.projectName;
  } else {
    switch ($selectedProjectStore[1]) {
      case "today":
        tasks = am.getTodaysTasks();
        heading = "Today";
        break;
      case "week":
        tasks = am.getThisWeeksTasks();
        heading = "This week";
        break;
      default:
        tasks = [];
    }
  }

  let mobileDevice;
  mobileDeviceStore.subscribe((value) => {
    mobileDevice = value;
  });
  let sidebarVisible;
  sidebarVisibleStore.subscribe((value) => {
    sidebarVisible = value;
  });
  let sidebarWidth = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--sidebar-width");
  let leftPosition;
  $: {
    if (mobileDevice && sidebarVisible) {
      leftPosition = "0px";
    } else if (sidebarVisible) {
      leftPosition = sidebarWidth;
    } else {
      leftPosition = "0px";
    }
  }
</script>

<div class="workspace" style="--left-position: {leftPosition};">
  <div class="workspace-productive">
    <div class="top-area">
      <h2>{heading}</h2>
      <div class="action-buttons">
        {#if $selectedProjectStore[0]}
          <OptionsDropDown>
            <Dots slot="button-content" color="gray" size="24px" />
            <button class="dropdown-item" type="button">
              <Plus color="gray" size="22" /><span>Add task</span></button
            >

            <button
              on:click={handleEditProject}
              class="dropdown-item"
              type="button"
            >
              <EditPencil color="gray" size="22" /><span>Edit project</span
              ></button
            >
            <button class="dropdown-item" type="button">
              <DeleteSymbol color="gray" size="22" /><span>Delete project</span
              ></button
            >
          </OptionsDropDown>
        {/if}
        <!-- <SymbolButton>
          <Dots color="gray" size="24px" />
        </SymbolButton> -->
      </div>
    </div>
    <div class="tasks-holder">
      <!-- {#each tasks.sort((a, b) => a.finished - b.finished) as taskItem} -->
      {#each _.sortBy(tasks, ["finished", "dueDate"]) as taskItem, i (taskItem)}
        <div
          class="task-card"
          animate:flip={{ duration: (i) => 30 * Math.sqrt(i) }}
        >
          <TaskCard projectId={$selectedProjectStore[1]} task={taskItem} />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .workspace {
    position: fixed;
    top: var(--topbar-height);
    left: var(--left-position);
    padding: 25px;
    height: calc(100vh - var(--topbar-height));
    width: calc(100vw - var(--left-position));
    /* border: 3px solid red; */
    transition: all 500ms cubic-bezier(0.23, 0.95, 0.32, 0.95);
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .workspace-productive {
    display: flex;
    flex-direction: column;
    align-content: center;
    width: calc(100% - 4em);
    max-width: 60em;
  }
  .top-area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  h2 {
    padding-left: 20px;
    margin-top: 0;
    align-self: flex-start;
  }
  .tasks-holder {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 1em;
  }
  .task-card {
    max-width: min(90%, 1000px);
    min-width: 90%;
  }
</style>
