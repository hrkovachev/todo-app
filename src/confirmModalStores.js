export const confirmModalVisibility = writable(false);
export const confirmModalTitle = writable("Please confirm");
import { writable } from "svelte/store";

export const confirmModalText = writable("Are you sure you want to do that?");
export const confirmModalBtnLabel = writable("Yes");
export const confirmFunction = writable(() => {
  return;
});
