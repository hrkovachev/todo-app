import { writable } from "svelte/store";
import Project from "./Project";

let projectsArray;
if (localStorage.getItem("projects")) {
  projectsArray = JSON.parse(localStorage.getItem("projects")).map((project) =>
    Project.fromJSON(project)
  );
} else {
  projectsArray = [];
}
export const projectsStore = writable(projectsArray);

projectsStore.subscribe((value) => {
  localStorage.projects = JSON.stringify(value);
});
