import Task from "./Task";

export default class Project {
  projectName;
  static projectIdCounter = 0;
  projectId;
  tasks;
  //#unfinishedTasks;
  constructor(projectName, projectId = undefined, tasks = []) {
    this.projectName = projectName;
    this.projectId = projectId | Project.projectIdCounter++;
    this.tasks = tasks;
  }
  static fromJSON(dataObject) {
    let tasksArray = dataObject.tasks.map(
      (task) =>
        new Task(
          task.title,
          task.description,
          task.dueDate,
          task.priority,
          task.finished,
          task.taskId
        )
    );
    return new Project(
      dataObject.projectName,
      dataObject.projectId,
      tasksArray
    );
  }
  get projectName() {
    return this.projectName;
  }
  set projectName(newName) {
    this.projectName = newName.toString();
  }

  get projectId() {
    return this.projectId;
  }

  unfinishedTasks() {
    let unfTasks = Array.prototype.filter.call(
      this.tasks,
      (task) => !task.finished
    );
    return unfTasks;
  }

  // get tasks() {
  //   let tasksArr = [];
  //   tasksArr = this.#tasks.sort((a, b) => a.finished - b.finished);
  //   return tasksArr;
  // }
  // set tasks(newTasks) {
  //   this.#tasks = newTasks;
  // }
  // addTask(title, description = undefined, dueDate = undefined, priority = 0) {
  //   let task = new Task(title, description, dueDate, priority);
  //   this.#tasks.push(task);
  // }
  // removeTask(taskId) {
  //   for (let i = 0; i < this.#tasks.length; i++) {
  //     if (this.#tasks[i].taksId === taskId) {
  //       this.#tasks = this.#tasks.splice(i, 1);
  //       break;
  //     }
  //   }
  // }

  // addToProject(taskId) {
  //   this.#tasks.push(taskId);
  // }
  // removeFromProject(taskId) {
  //   taskId = Number(taskId);
  //   for (let i = 0; i < this.#tasks.length; i++) {
  //     if (this.#tasks[i] === taskId) {
  //       this.#tasks.splice(i, 1);
  //       break;
  //     }
  //   }
  // }
}
