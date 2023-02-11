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
    projectsStore.update((projects) => {
      projects[projectIndex].projectName = newName;
      return projects;
    });
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
  getTask(taskId) {
    let projectId = this.findTasksProject(taskId);
    let project = this.getProject(projectId);
    let task = project.tasks.find((task) => task.taskId === taskId);
    return task;
  }
  updateTask(
    taskId,
    newProjectId,
    newTitle,
    newDescription,
    newDueDate,
    newPriority
  ) {
    let projectId = this.findTasksProject(taskId);
    let projectIndex = this.projects.findIndex(
      (project) => project.projectId === projectId
    );
    projectsStore.update((projects) => {
      let taskIndex = projects[projectIndex].tasks.findIndex(
        (task) => task.taskId === taskId
      );
      projects[projectIndex].tasks[taskIndex].title = newTitle;
      projects[projectIndex].tasks[taskIndex].description = newDescription;
      projects[projectIndex].tasks[taskIndex].dueDate = newDueDate;
      projects[projectIndex].tasks[taskIndex].priority = newPriority;
      if (newProjectId !== projectId) {
        this.moveTask(taskId, newProjectId);
      }
      return projects;
    });
  }

  moveTask(taskId, newProjectId) {
    let currProjectId = this.findTasksProject(taskId);
    if (currProjectId !== newProjectId) {
      let task = this.getTask(taskId);
      this.deleteTask(currProjectId, taskId);
      this.addTask(
        newProjectId,
        task.title,
        task.description,
        task.dueDate,
        task.priority
      );
    }
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
    let taskIndex = this.projects[projectIndex].tasks.findIndex(
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
    let projectIndex = this.projects.findIndex(
      (project) => project.projectId === projectId
    );
    projectsStore.update((projects) => {
      let taskIndex = projects[projectIndex].tasks.findIndex(
        (task) => task.taskId === taskId
      );
      projects[projectIndex].tasks[taskIndex].finished =
        !projects[projectIndex].tasks[taskIndex].finished;
      return projects;
    });
  }

  changeTaskDate(taskId, newDate) {
    let projectId = this.findTasksProject(taskId);
    let projectIndex = this.projects.findIndex(
      (project) => project.projectId === projectId
    );
    projectsStore.update((projects) => {
      let taskIndex = projects[projectIndex].tasks.findIndex(
        (task) => task.taskId === taskId
      );
      projects[projectIndex].tasks[taskIndex].dueDate = newDate;
      return projects;
    });
  }
}

export const appManager = new AppManager();

projectsStore.subscribe((projectsArray) => {
  if (projectsArray.length === 0) {
    appManager.createProject("Start");
  }
});
