<script>
  import Modal from "./Modal.svelte";
  import { newTaskModal, editTaskModal } from "../stores";
  import { appManager as am } from "../app-logic/AppManager";
  import { onMount } from "svelte";
  import { userLang, selectedProjectStore, editTaskId } from "../stores";
  import { DateInput } from "date-picker-svelte";
  import { projectsStore } from "../app-logic/appLogicStores";

  import { fade } from "svelte/transition";

  export let editMode = false;
  let selectedProjectIdforTask = $selectedProjectStore[1];
  let dueDate = null;
  let placeholderDate = "Select date";
  let maxDate = new Date(2100, 12, 31, 23, 59);
  let taskTitle;
  let taskNameinput;
  let projectName;
  let priority = 1; // 0 = low, 1 = normal, 2 = high
  let description = "";
  let btnLabel;
  let modalTitle;

  $: selectedProject = am.getProject(selectedProjectIdforTask);
  if (editMode) {
    let task = am.getTask($editTaskId);
    modalTitle = `Edit "${task.title}"`;
    btnLabel = "Save";
    taskTitle = task.title;
    dueDate = task.dueDate;
    priority = task.priority;
    description = task.description;
  } else {
    btnLabel = "Add";
    taskTitle = "";
  }
  $: if (!editMode) {
    projectName = selectedProject.projectName;
    modalTitle = `Add task to "${projectName}"`;
  }

  function handleAddClick() {
    if (taskTitle.length > 0) {
      if (editMode) {
        am.updateTask(
          $editTaskId,
          selectedProjectIdforTask,
          taskTitle,
          description,
          dueDate,
          priority
        );
      } else {
        am.addTask(
          selectedProjectIdforTask,
          taskTitle,
          description,
          dueDate,
          Number(priority)
        );
        console.log($projectsStore);
      }
      handleCloseClick();
    }
  }
  function handleCloseClick() {
    $newTaskModal = false;
    $editTaskModal = false;
  }
  onMount(() => {
    taskNameinput.focus();
  });
  function btnIsDisabled(inputValue) {
    return inputValue.trim().length < 1;
  }
</script>

<div class="new-task" transition:fade={{ duration: 100 }}>
  <Modal
    on:enter={handleAddClick}
    on:close={handleCloseClick}
    modalMaxHeight="calc(100vh - 2em)"
    modalMinHeight="calc(100vh - 5em)"
  >
    <h3 slot="header">{modalTitle}</h3>
    <!-- Task name -->
    <div class="form-field">
      <label for="edit_task_name">Name</label>
      <input
        id="edit_task_name"
        class="form_field_control"
        data-autofocus="true"
        maxlength="120"
        name="edit_task_name"
        bind:value={taskTitle}
        bind:this={taskNameinput}
      />
    </div>
    <!-- Project selection -->
    <div class="form-field">
      <label for="project-select">Project</label>
      <select bind:value={selectedProjectIdforTask} name="project-select">
        {#each $projectsStore as project}
          <option value={project.projectId}>
            {project.projectName}
          </option>
        {/each}
      </select>
    </div>
    <!-- Due date -->
    <div class="form-field">
      <label for="due-date">Due date</label>
      <div class="dueDate">
        <DateInput
          bind:value={dueDate}
          format="dd.MM.yyyy"
          locale={$userLang}
          closeOnSelection={true}
          placeholder={placeholderDate}
          max={maxDate}
          dateInputBorder={"1px solid gray"}
          dateInputBorderRadius={"2px"}
          dateInputWidth={"100%"}
          dateInputHeight={"2.5em"}
        />
      </div>
    </div>
    <!-- Priority -->
    <div class="form-field">
      <label for="due-date">Priority</label>
      <div class="radio-btns">
        <div class="radio-option">
          <input
            type="radio"
            id="prio-low"
            name="prio"
            bind:group={priority}
            value={0}
          />
          <label for="prio-low">Low</label>
        </div>
        <div class="radio-option">
          <input
            type="radio"
            id="prio-normal"
            name="prio"
            bind:group={priority}
            value={1}
          />
          <label for="prio-normal">Normal</label>
        </div>
        <div class="radio-option">
          <input
            type="radio"
            id="prio-high"
            name="prio"
            bind:group={priority}
            value={2}
          />
          <label for="prio-high">High</label>
        </div>
      </div>
    </div>
    <!-- Description -->
    <div class="form-field">
      <label for="due-date">Description</label>
      <textarea
        class="description-textarea"
        rows="5"
        bind:value={description}
      />
    </div>

    <span class="btns-holder" slot="btn-area">
      <!-- svelte-ignore a11y-autofocus -->
      <button class="btn btn-secondary" on:click={handleCloseClick}
        >Cancel</button
      >
      <!-- svelte-ignore a11y-autofocus -->
      <button
        class="btn btn-main"
        disabled={btnIsDisabled(taskTitle)}
        on:click={handleAddClick}>{btnLabel}</button
      >
    </span>
  </Modal>
</div>

<style>
  input {
    font-family: inherit;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
  .new-task {
    z-index: 99;
  }
  .form-field {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.5em;
    margin: 1em 0;
  }
  .form-field label {
    font-weight: 700;
  }
  .form-field input {
    font-size: 14px;
    padding: 5px;
    height: 2.5em;
    border: 1px solid gray;
    border-radius: 2px;
  }
  .btns-holder {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }

  .btns-holder button {
    font-size: 0.8em;
  }
  select {
    background: white;
    border: 1px solid gray;
    border-radius: 2px;
    padding: 5px;
    font-size: 14px;
    font-family: inherit;
    height: 2.5em;
  }
  .radio-btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
  }
  .radio-option {
    display: flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
  }
  input[type="radio"] {
    height: 18px;
    width: 18px;
  }
  .description-textarea {
    width: 100%;
    resize: vertical;
    border: 1px solid gray;
    border-radius: 2px;
    padding: 5px;
    font-size: 14px;
    font-family: inherit;
  }
</style>
