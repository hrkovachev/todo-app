import { isToday, isThisISOWeek, isFuture } from "date-fns";

import { projectsStore } from "./appLogicStores";

import Project from "./Project";
import Task from "./Task";

/** A class for managing the projects and tasks in the app. */
class AppManager {
  projects;

  constructor() {
    projectsStore.subscribe((value) => {
      this.projects = value;
    });
  }
  // create project
  createProject(projectName) {
    let newProject = new Project(projectName);
    projectsStore.update((value) => [...value, newProject]);
  }
  // delete project
  deleteProject(projectId) {
    let indexToDelete = this.projects.findIndex(
      (project) => project.projectId === projectId
    );
    projectsStore.update((value) => [
      ...value.slice(0, indexToDelete),
      ...value.slice(indexToDelete + 1),
    ]);
  }
  // rename project
  renameProject(projectId, newName) {
    let projectIndex = this.projects.findIndex(
      (project) => project.projectId === projectId
    );
    projectsStore.update((projects) =>
      projects[projectIndex].renameProject(newName)
    );
  }
  getProject(projectId) {
    let projectIndex = this.projects.findIndex(
      (project) => project.projectId === projectId
    );
    return this.projects[projectIndex];
  }
  addTask(projectId, title, description, dueDate, priority) {
    let newTask = new Task(title, description, dueDate, priority);
    let projectIndex = this.projects.findIndex(
      (project) => project.projectId === projectId
    );
    projectsStore.update((projects) => {
      projects[projectIndex].tasks = [...projects[projectIndex].tasks, newTask];
      return projects;
    });
  }

  findTasksProject(taskId) {
    let projectId;
    let foundTask;
    for (const project of this.projects) {
      foundTask = project.tasks.find((task) => taskId === task.taskId);
      if (foundTask) {
        projectId = project["projectId"];
        break;
      }
    }
    return projectId;
  }

  deleteTask(projectId = undefined, taskId) {
    if (projectId === undefined) {
      // find the project with the task
      // if the task comes from filter and not from a project directly
      projectId = this.findTasksProject(taskId);
    }
    let projectIndex = this.projects.findIndex(
      (project) => project.projectId === projectId
    );
    let taskIndex = this.projects[projectId].tasks.findIndex(
      (task) => task.taskId === taskId
    );
    projectsStore.update((projects) => {
      projects[projectIndex].tasks.splice(taskIndex, 1);
      return projects;
    });
  }
  getTodaysTasks(onlyUnfinished = false) {
    let todaysTasksArr = [];
    if (onlyUnfinished) {
      Array.prototype.forEach.call(this.projects, (project) => {
        todaysTasksArr.push(
          ...project.tasks.filter(
            (task) => isToday(task.dueDate) && !task.finished
          )
        );
      });
    } else {
      Array.prototype.forEach.call(this.projects, (project) => {
        todaysTasksArr.push(
          ...project.tasks.filter((task) => isToday(task.dueDate))
        );
      });
    }
    return todaysTasksArr;
  }
  getThisWeeksTasks(onlyUnfinished = false, onlyUpcoming = true) {
    let todaysTasksArr = [];
    if (onlyUpcoming) {
      Array.prototype.forEach.call(this.projects, (project) => {
        todaysTasksArr.push(
          ...project.tasks.filter(
            (task) =>
              isThisISOWeek(task.dueDate) &&
              (isToday(task.dueDate) || isFuture(task.dueDate))
          )
        );
      });
    } else {
      Array.prototype.forEach.call(this.projects, (project) => {
        todaysTasksArr.push(
          ...project.tasks.filter((task) => isThisISOWeek(task.dueDate))
        );
      });
    }
    if (onlyUnfinished) {
      return todaysTasksArr.filter((task) => !task.finished);
    } else {
      return todaysTasksArr;
    }
  }

  changeTaskStatus(taskId) {
    let projectId = this.findTasksProject(taskId);
    projectsStore.update((projects) => {
      let taskIndex = projects[projectId].tasks.findIndex(
        (task) => task.taskId === taskId
      );
      projects[projectId].tasks[taskIndex].finished =
        !projects[projectId].tasks[taskIndex].finished;
      return projects;
    });
  }

  changeTaskDate(taskId, newDate) {
    let projectId = this.findTasksProject(taskId);
    projectsStore.update((projects) => {
      let taskIndex = projects[projectId].tasks.findIndex(
        (task) => task.taskId === taskId
      );
      projects[projectId].tasks[taskIndex].dueDate = newDate;
      return projects;
    });
  }
}

export const appManager = new AppManager();
// create default project
appManager.createProject("Start");
