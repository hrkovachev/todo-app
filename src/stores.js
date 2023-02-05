import { writable, readable } from "svelte/store";

export const sidebarVisibleStore = writable(true); // from screen size
export const mobileDeviceStore = writable(); // boolean, true if device screen < 600px
export const userLang = readable(navigator.language || navigator.userLanguage);

/**  First argument tells if a project (true) or a filter (false) is selected;
 *  second argument is the project or the filter that is selected.
 * The allowed values for the second agrument are index, "today" or "week".*/
export const selectedProjectStore = writable([true, 0]);

export const newProjectModal = writable(false);
export const editProjectModal = writable(false);
export const editProjectId = writable();

export const newTaskModal = writable(false);
export const editTaskModal = writable(false);
export const editTaskId = writable();

export const priorityColorsObj = readable({
  0: "#dcdcdc",
  1: "#444444",
  2: "#f44336",
});

export const projectColorsPalette = readable([
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#FF0000" },
  { name: "Maroon", value: "#800000" },
  { name: "Yellow", value: "#FFFF00" },
  { name: "Olive", value: "#808000" },
  { name: "Lime", value: "#00FF00" },
  { name: "Green", value: "#008000" },
  { name: "Aqua", value: "#00FFFF" },
  { name: "Teal", value: "#008080" },
  { name: "Blue", value: "#0000FF" },
  { name: "Navy", value: "#000080" },
  { name: "Fuchsia", value: "#FF00FF" },
  { name: "Purple", value: "#800080" },
]);
