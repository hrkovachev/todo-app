<script>
  import Modal from "./Modal.svelte";
  import { fade } from "svelte/transition";

  import {
    confirmModalTitle,
    confirmModalVisibility,
    confirmModalText,
    confirmModalBtnLabel,
    confirmFunction,
  } from "../confirmModalStores";

  function handleCloseClick() {
    $confirmModalVisibility = false;
  }
  function handleConfirm() {
    $confirmFunction();
    $confirmModalVisibility = false;
  }
</script>

<div class="confirm-modal" transition:fade={{ duration: 100 }}>
  <Modal>
    <h3 slot="header">{$confirmModalTitle}</h3>
    {$confirmModalText}
    <span class="btns-holder" slot="btn-area">
      <!-- svelte-ignore a11y-autofocus -->
      <button class="btn btn-secondary" on:click={handleCloseClick}
        >Cancel</button
      >
      <!-- svelte-ignore a11y-autofocus -->
      <button class="btn btn-delete" on:click={handleConfirm}
        >{$confirmModalBtnLabel}</button
      >
    </span>
  </Modal>
</div>

<style>
  .confirm-modal {
    z-index: 99;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
