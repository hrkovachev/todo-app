import Checklist from "./Checklist";
// import Project from "./Project";

export default class Task {
  #title;
  #description;
  #dueDate;
  #priority; // 0 = low, 1 = normal, 2 = high
  #finished;
  #checklist = new Checklist();
  static #taskIdCounter = 0;
  #taskId;
  // static #tasks = [];

  constructor(
    title,
    description = "",
    dueDate = null,
    priority = 1,
    finished = false
  ) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate ? new Date(dueDate) : null;
    this.#priority = priority;
    this.#finished = finished;
    this.#taskId = Task.#taskIdCounter++;
    // Task.#tasks.push(this);
  }
  get title() {
    return this.#title;
  }
  set title(newTitle) {
    this.#title = newTitle;
  }
  get description() {
    return this.#description;
  }
  set description(newdescription) {
    this.#description = newdescription;
  }
  get dueDate() {
    return this.#dueDate;
  }
  set dueDate(newDueDate) {
    this.#dueDate = new Date(newDueDate);
  }
  get priority() {
    return this.#priority;
  }
  set priority(priorityLevel) {
    this.#priority = priorityLevel;
  }
  get finished() {
    return this.#finished;
  }
  set finished(newStatus) {
    this.#finished = newStatus;
  }

  get checklist() {
    return this.#checklist;
  }
  addChecklistItem(item) {
    this.#checklist.addItem(item);
  }

  get taskId() {
    return this.#taskId;
  }

  // get projectId() {
  //   return this.#projectId;
  // }

  // static getTask(i) {
  //   return Task.#tasks[i];
  // }

  // deleteSelf() {
  //   let index;
  //   for (const [i, task] of Task.tasks.entries()) {
  //     if (task.taskId == this.taskId) {
  //       index = i;
  //       break;
  //     }
  //   }
  //   Task.#tasks = [
  //     ...Task.tasks.slice(0, index),
  //     ...Task.tasks.slice(index + 1),
  //   ];
  // }

  /**Assigns this task to new project and deletes the task from old project*/
  // assignProject(newProjectId) {
  //   // remove from old project
  //   if (this.#projectId !== undefined) {
  //     // find the current project, if any
  //     for (const project of Project.projects) {
  //       if (project.projectId === this.projectId) {
  //         project.removeFromProject(this.#taskId);
  //       }
  //     }
  //   }
  //   // add to new project
  //   for (const project of Project.projects) {
  //     if (project.projectId === newProjectId) {
  //       project.addToProject(Number(this.#taskId));
  //       this.#projectId = newProjectId;
  //     }
  //   }
  // }

  // static get tasks() {
  //   return Task.#tasks;
  // }

  /**Returns the tasks for the current day */
  // static getTodaysTasks(onlyFinished = false) {
  //   if (onlyFinished) {
  //     return Task.#tasks.filter(
  //       (task) => isToday(task.dueDate) && task.finished
  //     );
  //   } else {
  //     return Task.#tasks.filter((task) => isToday(task.dueDate));
  //   }
  // }
  // /**Returns the tasks for the current week */
  // static getThisWeekTasks(onlyFinished = false) {
  //   if (onlyFinished) {
  //     return Task.#tasks.filter(
  //       (task) => isThisISOWeek(task.dueDate) && task.finished
  //     );
  //   } else {
  //     return Task.#tasks.filter((task) => isThisISOWeek(task.dueDate));
  //   }
  // }

  // static getFinishedTasks() {
  //   return Task.#tasks.filter((task) => task.finished);
  // }
  // static getUnfinishedTasks() {
  //   return Task.#tasks.filter((task) => !task.finished);
  // }

  /**Returns past tasks, that are still open */
  // getPastOpenTasks() {}
}

// Object.defineProperties(Array.prototype, {
//   getTodaysTasks: {
//     value: function (onlyFinished = false) {
//       let arr = [];
//       if (onlyFinished) {
//         for (const task of this) {
//           if (isToday(task.dueDate) && task.finished) {
//             arr.push(task);
//           }
//         }
//       } else {
//         for (const task of this) {
//           if (isToday(task.dueDate)) {
//             arr.push(task);
//           }
//         }
//       }
//       return arr;
//     },
//   },
//   getThisWeeksTasks: {
//     value: function (onlyFinished = false) {
//       let arr = [];
//       if (onlyFinished) {
//         for (const task of this) {
//           if (isThisISOWeek(task.dueDate) && task.finished) {
//             arr.push(task);
//           }
//         }
//       } else {
//         for (const task of this) {
//           if (isThisISOWeek(task.dueDate)) {
//             arr.push(task);
//           }
//         }
//       }
//       return arr;
//     },
//   },
// });
