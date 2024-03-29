<script>
  import { fade } from "svelte/transition";
  import Checkbox from "./Checkbox.svelte";
  import EditPencil from "svelte-material-icons/PencilOutline.svelte";
  import DeleteSymbol from "svelte-material-icons/DeleteForeverOutline.svelte";
  import { appManager as am } from "../app-logic/AppManager";
  import {
    userLang,
    mobileDeviceStore,
    editTaskModal,
    editTaskId,
    priorityColorsObj,
  } from "../stores";
  import {
    confirmModalTitle,
    confirmModalVisibility,
    confirmModalText,
    confirmModalBtnLabel,
    confirmFunction,
  } from "../confirmModalStores";
  import { DateInput } from "date-picker-svelte";
  export let projectId = undefined;
  export let task;

  let date = task.dueDate;

  function handleDateChange() {
    am.changeTaskDate(task.taskId, date);
  }

  let mouseOver;
  let card;
  let editBox;
  let editMode = false;

  function onMouseEnter() {
    mouseOver = true;
  }
  function onMouseLeave() {
    mouseOver = false;
  }

  function handleNameClick() {
    editMode = true;
    editBox.style.display = "inline";
    editBox.focus();
  }

  function handleEditClick() {
    $editTaskId = task.taskId;
    $editTaskModal = true;
  }
  function handleTaskRename() {
    editMode = false;
    editBox.style.display = "none";
    highlightChange(card);
  }
  function highlightChange(element) {
    requestAnimationFrame(() => {
      // instant red bg flash in
      element.style.transition = "none";
      element.style.backgroundColor = "rgba(204, 224, 201, 0.5)";

      setTimeout(() => {
        // slow 1s fade out
        element.style.transition = "color 1s, background 1s";
        element.style.backgroundColor = "";
      });
    });
  }

  function handleDeleteTask() {
    $confirmModalTitle = `Delete task "${task.title}"`;
    $confirmModalText = `Are you sure you want to delete "${task.title}"?`;
    $confirmModalBtnLabel = "Delete";
    $confirmFunction = am.deleteTask.bind(
      am,
      isNaN(projectId) ? undefined : projectId,
      task.taskId
    );
    $confirmModalVisibility = true;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="task-item"
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  bind:this={card}
>
  <div class="checkbox">
    <Checkbox
      bind:finished={task.finished}
      taskId={task.taskId}
      color={$priorityColorsObj[task.priority]}
    />
  </div>
  <div class="task-info">
    <div class="upper-row">
      <div class="task-item-left-side">
        <input
          type="text"
          class="task-title-edit"
          bind:this={editBox}
          bind:value={task.title}
          on:change={handleTaskRename}
          on:blur={handleTaskRename}
          style="display: {editMode ? 'inline-block' : 'none'};"
        />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="task-title"
          on:click|stopPropagation={handleNameClick}
          style="display: {!editMode ? 'inline-block' : 'none'};
            text-decoration: {task.finished ? 'line-through' : 'none'};"
        >
          {task.title}
        </div>
      </div>
      {#if mouseOver || $mobileDeviceStore || editMode}
        <div class="task-item-right-side" transition:fade={{ duration: 100 }}>
          <button
            class="task-item-action"
            on:click|stopPropagation={handleEditClick}
          >
            <EditPencil color="gray" size="22" />
          </button>
          <button
            class="task-item-action"
            on:click|stopPropagation={handleDeleteTask}
          >
            <DeleteSymbol color="gray" size="22" />
          </button>
        </div>
      {/if}
    </div>
    <div class="details">
      {#if task.description !== ""}
        <div class="task-description">
          {task.description}
        </div>
      {/if}
      <div class="due-date">
        <DateInput
          placeholder="No due date"
          bind:value={date}
          on:select={handleDateChange}
          format="dd.MM.yyyy"
          locale={$userLang}
          closeOnSelection={true}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .task-item {
    display: flex;
    flex-direction: row;
    min-height: 50px;
    border-bottom: 1px solid #ededef;
    user-select: none;
    justify-content: flex-start;
  }
  .task-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2px;
  }

  .upper-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 5px 0 0;
    align-items: center;
    height: 31px;
  }
  .task-item-left-side {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .task-item-right-side {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1em;
    align-items: center;
  }
  .task-item-action {
    font-family: inherit;
    font-size: 13px;
    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
  }

  .task-title {
    width: 100%;
    border: 1px solid transparent;
  }
  .task-title:hover {
    cursor: text;
    border: 1px solid var(--accent-color-1);
    border-radius: 5px;
    padding: 5px;
    margin-left: -5px;
    margin-right: 5px;
  }
  .task-title-edit {
    font-family: inherit;
    font-size: inherit;
    border: 1px solid var(--accent-color-1);
    padding: 5px;
    margin-left: -5px;
    margin-right: 5px;
    border-radius: 5px;
    width: 100%;
  }
  .details {
    padding: 0 0 5px 0;
  }
  .task-description {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-left: 5px;
    color: gray;
  }
</style>
