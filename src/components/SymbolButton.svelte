<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const click = () => dispatch("click");
</script>

<button on:click={click}>
  <slot />
</button>

<style>
  button {
    background: none;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  button:hover {
    background-color: hsla(0, 0%, 91%, 0.5); /* hsla(0, 0%, 100%, 0.2); */
    border-radius: 10%;
  }
</style>
