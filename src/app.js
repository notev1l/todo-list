console.log('ToDo List')
const todos = document.querySelector('.todos')
const form = document.querySelector('.input-block')
const taskInput = document.querySelector('#task-input')
const tasks = localStorage.getItem('taskData') ? new Map(JSON.parse(localStorage.getItem('taskData'))) : new Map();
console.log(tasks);

class Task {
  constructor(taskID, taskName, priority, dueDate, isCompleted = false) {
    this.taskID = taskID;
    this.taskName = taskName
    this.priority = priority
    this.dueDate = dueDate;
    this.createdAt = new Date().toLocaleString()
    this.isCompleted = isCompleted;
    this.element = null
  }

  init() {
    this.render()
    this.addEventListeners()
    return this
  }

  render() {
    const template = document.getElementById('task-template')
    const clone = template.content.cloneNode(true)
    clone.querySelector('.task-name').textContent = this.taskName
    todos.appendChild(clone)
    this.element = todos.lastElementChild
  }

  complete(target) {
    this.element.querySelector('.task-name').classList.toggle('strike-through')
    this.isCompleted = !this.isCompleted;
    tasks.get(this.taskID).isCompleted = this.isCompleted;
    localStorage.setItem('taskData', JSON.stringify(Array.from(tasks.entries())))
    if (target) return;
    this.element.querySelector('.check-task-btn').checked = !this.element.querySelector('.check-task-btn').checked;
  }

  delete() {
    this.element.remove()
    console.log(tasks);
    tasks.delete(this.taskID)
    localStorage.setItem('taskData', JSON.stringify(Array.from(tasks.entries()))) 
  }

  check() {
    if (tasks.get(this.taskID).isCompleted) {
      this.element.querySelector('.task-name').classList.add('strike-through')
      this.isCompleted = true
      this.element.querySelector('.check-task-btn').checked = true;
    }
  }

  addEventListeners() {
    this.element
      .querySelector('.delete-task-btn')
      .addEventListener('click', () => {this.delete()})

    this.element
      .querySelector('.check-task-btn')
      .addEventListener('click', (e) => {this.complete(e.target.type)})

    this.element
      .querySelector('.task-name')
      .addEventListener('click', () => {this.complete()})
  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault()
  const taskID = Math.random().toString(16).slice(2);
  const taskName = taskInput.value.trim();
  const priority = 'normal';
  const dueDate = null
  if (!taskInput.value.trim()) return
  new Task(taskID,taskName, priority, dueDate).init()
  tasks.set(`${taskID}`, {'taskID':`${taskID}`, 'taskName':`${taskName}`,'priority':`${priority}`, 'dueDate':`${dueDate}`, 'isCompleted':`${false}`})
  localStorage.setItem('taskData', JSON.stringify(Array.from(tasks.entries())))  
  taskInput.value = ''
})

function loadTasks() {
  new Map(JSON.parse(localStorage.getItem('taskData'))).forEach(task => {
    const newTask = new Task(task.taskID, task.taskName, task.priority, task.dueDate, task.isCompleted).init().check()
  });
}
loadTasks()