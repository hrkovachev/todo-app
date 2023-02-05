<script>
  import Modal from "./Modal.svelte";
  import { fade } from "svelte/transition";
  // import OptionsDropDown from "./OptionsDropDown.svelte";
  import {
    newProjectModal,
    editProjectModal,
    // projectColorsPalette,
  } from "../stores";
  import { appManager as am } from "../app-logic/AppManager";
  import { onMount } from "svelte";
  // import Circle from "svelte-material-icons/Circle.svelte";

  export let editMode = false;
  export let projectId = undefined;
  let projectName;
  let btnLabel;
  let modalTitle;
  if (editMode) {
    btnLabel = "Save";
    let selecteProjet = am.getProject(projectId);
    projectName = selecteProjet.projectName;
    modalTitle = `Edit "${projectName}"`;
  } else {
    btnLabel = "Add";
    projectName = "";
    modalTitle = "Add project";
  }

  let projectNameinput;

  function handleAddClick() {
    if (projectName.length > 0) {
      if (editMode) {
        am.renameProject(projectId, projectName);
      } else {
        am.createProject(projectName);
      }
      handleCloseClick();
    }
  }
  function handleCloseClick() {
    $newProjectModal = false;
    $editProjectModal = false;
  }
  onMount(() => {
    projectNameinput.focus();
  });
  function btnIsDisabled(inputValue) {
    return inputValue.trim().length < 1;
  }
</script>

<div class="new-project" transition:fade={{ duration: 100 }}>
  <Modal
    on:enter={handleAddClick}
    on:close={handleCloseClick}
    modalMaxHeight="calc(100vh - 2em)"
  >
    <h3 slot="header">{modalTitle}</h3>

    <div class="form-field">
      <label for="edit_project_name">Name</label>
      <input
        id="edit_project_name"
        class="form_field_control"
        data-autofocus="true"
        maxlength="120"
        name="edit_project_name"
        bind:value={projectName}
        bind:this={projectNameinput}
      />
    </div>
    <!-- <div class="form-field">
      <label for="edit_project_name">Project color</label>
      <OptionsDropDown>
        <select slot="button-content" />
        {#each $projectColorsPalette as color}
          <button class="dropdown-item" type="button">
            <Circle color={color.value} size="22" /><span>{color.name}</span
            ></button
          >
        {/each}
      </OptionsDropDown>
    </div> -->

    <span class="btns-holder" slot="btn-area">
      <!-- svelte-ignore a11y-autofocus -->
      <button class="btn btn-secondary" on:click={handleCloseClick}
        >Cancel</button
      >
      <!-- svelte-ignore a11y-autofocus -->
      <button
        class="btn btn-main"
        disabled={btnIsDisabled(projectName)}
        on:click={handleAddClick}>{btnLabel}</button
      >
    </span>
  </Modal>
</div>

<style>
  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
  .new-project {
    z-index: 99;
  }
  .form-field {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.5em;
  }
  .form-field label {
    font-weight: 700;
  }
  .form-field input {
    font-size: 14px;
    padding: 5px;
  }
  .btns-holder {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }

  .btns-holder button {
    font-size: 0.8em;
  }
</style>
