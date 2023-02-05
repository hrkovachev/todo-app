<script>
  import { createEventDispatcher, onDestroy } from "svelte";

  export let modalMaxHeight = "auto";
  export let modalMinHeight = "auto";
  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");
  const enter = () => dispatch("enter");

  let modal;

  const handle_keydown = (e) => {
    if (e.key === "Enter") {
      enter();
      return;
    }
    if (e.key === "Escape") {
      close();
      return;
    }

    if (e.key === "Tab") {
      // trap focus
      const nodes = modal.querySelectorAll("*");
      const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && e.shiftKey) index = 0;

      index += tabbable.length + (e.shiftKey ? -1 : 1);
      index %= tabbable.length;

      tabbable[index].focus();
      e.preventDefault();
    }
  };

  const previously_focused =
    typeof document !== "undefined" && document.activeElement;

  if (previously_focused) {
    onDestroy(() => {
      previously_focused.focus();
    });
  }
</script>

<svelte:window on:keydown={handle_keydown} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-background" on:click={close} />

<div
  style="--max-height:{modalMaxHeight};--min-height:{modalMinHeight};"
  class="modal"
  role="dialog"
  aria-modal="true"
  bind:this={modal}
>
  <div class="header">
    <slot name="header" />
  </div>

  <div class="modal-content">
    <slot />
  </div>
  <div class="btn-area">
    <slot name="btn-area" />
  </div>
</div>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    min-height: var(--min-height);
    max-height: var(--max-height);
    /* max-height: calc(100vh - 4em); */
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.5em;
    background: white;
    display: flex;
    flex-direction: column;
  }

  .modal-content {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .btn-area {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: auto;
  }
</style>
