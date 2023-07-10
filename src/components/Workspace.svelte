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
    newTaskModal,
  } from "../stores";
  import {
    confirmModalTitle,
    confirmModalVisibility,
    confirmModalText,
    confirmModalBtnLabel,
    confirmFunction,
  } from "../confirmModalStores";
  import { projectsStore } from "../app-logic/appLogicStores";

  import { appManager as am } from "../app-logic/AppManager";
  import TaskCard from "./TaskCard.svelte";

  let tasks;
  let heading;

  let backgroundClass;
  let emptyText;

  function handleEditProject() {
    $editProjectModal = true;
    $editProjectId = $selectedProjectStore[1];
  }

  function handleDeleteProject() {
    $confirmModalTitle = `Delete project "${heading}"`;
    $confirmModalText = `Are you sure you want to delete "${heading}"?`;
    $confirmModalBtnLabel = "Delete";
    $confirmFunction = am.deleteProject.bind(am, $selectedProjectStore[1]);
    $confirmModalVisibility = true;
  }

  function handleAddTask() {
    $newTaskModal = true;
  }

  function getCurrProject(projects) {
    let currProject = projects.find(
      (project) => project.projectId === $selectedProjectStore[1]
    );
    if (!currProject) {
      $selectedProjectStore = [true, 0];
      projects = $projectsStore;
      currProject = getCurrProject($projectsStore);
    }
    return currProject;
  }

  $: if ($selectedProjectStore[0]) {
    let currProject = getCurrProject($projectsStore);
    tasks = currProject.tasks;
    heading = currProject.projectName;
    if (currProject.projectId === 0) {
      backgroundClass = "add-tasks";
      emptyText = "Start planning by adding some tasks.";
    } else {
      backgroundClass = "project-empty";
      emptyText = "Looks like you have no tasks in this project.";
    }
  } else {
    switch ($selectedProjectStore[1]) {
      case "today":
        tasks = am.getTodaysTasks();
        heading = "Today";
        backgroundClass = "done-for-today";
        emptyText = "Super, all done for today!";
        break;
      case "week":
        tasks = am.getThisWeeksTasks();
        heading = "This week";
        backgroundClass = "done-for-week";
        emptyText = "Yeay, week is clear. Let's go party!";
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
            <button
              on:click={handleAddTask}
              class="dropdown-item"
              type="button"
            >
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
            {#if $selectedProjectStore[1] !== 0}
              <button
                on:click={handleDeleteProject}
                class="dropdown-item"
                type="button"
              >
                <DeleteSymbol color="gray" size="22" /><span
                  >Delete project</span
                ></button
              >
            {/if}
          </OptionsDropDown>
        {/if}
        <!-- <SymbolButton>
          <Dots color="gray" size="24px" />
        </SymbolButton> -->
      </div>
    </div>
    {#if tasks.length === 0}
      <div class="background-holder {backgroundClass}">
        <h4>{emptyText}</h4>
      </div>
    {:else}
      <div class="tasks-holder">
        {#each _.orderBy(tasks, ["finished", "dueDate", "priority"], ["asc", "asc", "desc"]) as taskItem, i (taskItem)}
          <div
            class="task-card"
            animate:flip={{ duration: (i) => 30 * Math.sqrt(i) }}
          >
            <TaskCard projectId={$selectedProjectStore[1]} task={taskItem} />
          </div>
        {/each}
      </div>
    {/if}
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
    margin-bottom: 1.5em;
  }
  h2 {
    padding-left: 20px;
    margin-top: 0;
    margin-bottom: 0;
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
  .background-holder {
    display: flex;
    justify-content: space-around;
    height: 100%;

    background-size: max(250px, 35%);
    background-repeat: no-repeat;
    background-position: 50%;
    user-select: none;
  }
  .add-tasks {
    background-image: url("./img/add_tasks.svg");
  }
  .project-empty {
    background-image: url("./img/project_empty.svg");
  }
  .done-for-today {
    background-image: url("./img/done_for_today.svg");
  }
  .done-for-week {
    background-image: url("./img/done_for_week.svg");
  }
</style>
