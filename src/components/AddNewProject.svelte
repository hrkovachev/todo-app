<script>
  import Modal from "./Modal.svelte";
  import { newProjectModal } from "../stores";
  import { appManager as am } from "../app-logic/AppManager";
  import { onMount } from "svelte";
  let newProjectName = "";
  let projectNameinput;
  function handleAddClick() {
    if (newProjectName.length > 0) {
      am.createProject(newProjectName);
      handleCloseClick();
    }
  }
  function handleCloseClick() {
    $newProjectModal = false;
  }
  onMount(() => {
    projectNameinput.focus();
  });
  function btnIsDisabled(inputField) {
    return inputField.trim().length < 1;
  }
</script>

<div class="new-project">
  <Modal on:enter={handleAddClick} on:close={handleCloseClick}>
    <h3 slot="header">Add project</h3>

    <div class="form-field">
      <label for="edit_project_name">Name</label>
      <input
        id="edit_project_name"
        class="form_field_control"
        data-autofocus="true"
        maxlength="120"
        name="name"
        bind:value={newProjectName}
        bind:this={projectNameinput}
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
        disabled={btnIsDisabled(newProjectName)}
        on:click={handleAddClick}>Add</button
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
</style>
