<script>
  import CheckedCircle from "svelte-material-icons/CheckCircleOutline.svelte";
  import BlankCircle from "svelte-material-icons/CheckboxBlankCircleOutline.svelte";
  import { appManager as am } from "../app-logic/AppManager";

  export let finished;
  export let taskId;
  export let color = "#dcdcdc";

  let mouseOver;
</script>

{#if finished}
  <button
    type="button"
    class="task-checkbox"
    on:click|stopPropagation={() => am.changeTaskStatus(taskId)}
  >
    <CheckedCircle height="24" width="24" color="#black" />
  </button>
{:else}
  <button
    type="button"
    class="task-checkbox"
    on:mouseenter={() => {
      mouseOver = true;
    }}
    on:mouseleave={() => {
      mouseOver = false;
    }}
    on:click|stopPropagation={() => am.changeTaskStatus(taskId)}
    >{#if mouseOver}
      <CheckedCircle height="24" width="24" {color} />
    {:else}
      <BlankCircle height="24" width="24" {color} />
    {/if}
  </button>
{/if}

<style>
  .task-checkbox {
    margin: 4px 6px 8px 0;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
  }
  button {
    font-family: inherit;
    font-size: 13px;
    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
  }
</style>
