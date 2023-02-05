<script>
  import {
    sidebarVisibleStore,
    mobileDeviceStore,
    selectedProjectStore,
    newProjectModal,
  } from "../stores";
  import { projectsStore } from "../app-logic/appLogicStores";
  import { appManager as am } from "../app-logic/AppManager";
  import SidebarFilterElement from "./SidebarFilterElement.svelte";
  import { fly, fade } from "svelte/transition";
  import AllIcon from "svelte-material-icons/BallotOutline.svelte";
  import TodayIcon from "svelte-material-icons/CalendarToday.svelte";
  import WeekIcon from "svelte-material-icons/CalendarRange.svelte";
  import Bullet from "svelte-material-icons/CircleSmall.svelte";
  import PlusIcon from "svelte-material-icons/Plus.svelte";

  am.createProject("Work");
  am.createProject("Hobby");

  am.addTask(
    1,
    "To love Diana",
    "She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! She is wonderful! ",
    new Date("2023-01-26"),
    2
  );
  am.addTask(2, "Write code", "", new Date("2023-01-26"), 0);
  am.addTask(1, "Read a book", "", new Date("2023-01-27"), 1);
  am.addTask(1, "Go for a walk", "", new Date("2023-01-29"), 1);

  let projects;
  projectsStore.subscribe((value) => {
    projects = value;
  });

  let mobileDevice;
  mobileDeviceStore.subscribe((value) => {
    mobileDevice = value;
  });

  let mouseOverSidebar;

  // get initial value of sidebar visibility
  let sidebarVisible;
  sidebarVisibleStore.subscribe((value) => {
    sidebarVisible = value;
  });

  // get media query list for dynamicaly toggling sidebar visibility
  let mql = window.matchMedia("(max-width: 1000px)");

  // initial value for sidebar visibility on page load base on screen size
  if (mql.matches) {
    // case small screen
    sidebarVisibleStore.update(() => false);
  } else {
    // case big screen
    sidebarVisibleStore.update(() => true);
  }

  // passing id of default project only to trigger reactivity
  $: todaysCount = am.getTodaysTasks(true, projects[0].projectId).length;
  $: weeksCount = am.getThisWeeksTasks(
    true,
    true,
    projects[0].projectId
  ).length;

  // event listener for change of screen size, that toggles the sidebar visibility
  mql.onchange = (e) => {
    if (e.matches) {
      sidebarVisibleStore.update(() => false);
    } else {
      sidebarVisibleStore.update(() => true);
    }
  };

  function handleProjectClick(index) {
    selectedProjectStore.set([true, projects[index].projectId]);
  }
  function handleFilterClick(filter) {
    selectedProjectStore.set([false, filter]);
  }
</script>

{#if sidebarVisible}
  <div
    on:mouseenter={() => {
      mouseOverSidebar = true;
    }}
    on:mouseleave={() => {
      mouseOverSidebar = false;
    }}
    transition:fly={{ x: -240, duration: 500 }}
    id="sidebar"
  >
    <div class="task-filters">
      <ul>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => handleProjectClick(0)}>
          <SidebarFilterElement
            Icon={AllIcon}
            color={"#878631"}
            title={projects[0].projectName}
            count={projects[0].unfinishedTasks.length}
          />
        </li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => handleFilterClick("today")}>
          <SidebarFilterElement
            Icon={TodayIcon}
            color={"#DBAD6A"}
            title="Today"
            count={todaysCount}
          />
        </li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => handleFilterClick("week")}>
          <SidebarFilterElement
            Icon={WeekIcon}
            color={"#C1292E"}
            title="This week"
            count={weeksCount}
          />
        </li>
      </ul>
    </div>
    <div class="projects-heading">
      <h3>Projects</h3>
      {#if mouseOverSidebar || mobileDevice}
        <button
          transition:fade={{ duration: 100 }}
          class="btnNewProject"
          on:click={() => ($newProjectModal = true)}
        >
          <PlusIcon size="20" />
        </button>
      {/if}
    </div>
    <div class="projects-list-container">
      <ul class="projects-list">
        {#each projects as project, index}
          {#if project.projectId !== 0}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li class="project-item" on:click={() => handleProjectClick(index)}>
              <SidebarFilterElement
                Icon={Bullet}
                color={"grey"}
                title={project.projectName}
                count={project.unfinishedTasks.length}
              />
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  </div>
{/if}

<style>
  #sidebar {
    width: var(--sidebar-width);
    height: 100%;
    background-color: #fafafa;
    position: fixed;
    top: var(--topbar-height); /* size of the top bar */
    padding-left: 18px;
    padding-right: 18px;
    z-index: 50;
    overflow-y: auto;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  li {
    cursor: pointer;
  }
  .projects-heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .btnNewProject {
    background: none;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 3px;
  }
  .btnNewProject:hover {
    background-color: #eeeeee;
    border-radius: 5px;
  }
</style>
