import { writable, readable } from "svelte/store";

export const sidebarVisibleStore = writable(true); // from screen size
export const mobileDeviceStore = writable(); // boolean, true if device screen < 600px
export const userLang = readable(navigator.language || navigator.userLanguage);

/**  First argument tells if a project (true) or a filter (false) is selected;
 *  second argument is the project or the filter that is selected.
 * The allowed values for the second agrument are index, "today" or "week".*/
export const selectedProjectStore = writable([true, 0]);

export const newProjectModal = writable(false);
