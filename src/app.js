console.log('ToDo List')
const todos = document.querySelector('.todos')
const form = document.querySelector('.input-block')
const taskInput = document.querySelector('#task-input')
const tasks = localStorage.getItem('taskData')
  ? new Map(JSON.parse(localStorage.getItem('taskData')))
  : new Map()
const totalTasks = document.querySelector('.total-info')
const completedTasks = document.querySelector('.completed-info')

class Task {
  constructor(taskID, taskName, priority, dueDate, createdAt, isCompleted) {
    this.taskID = taskID
    this.taskName = taskName
    this.priority = priority
    this.dueDate = dueDate
    this.createdAt = createdAt;
    this.isCompleted = isCompleted
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
    totalTasks.textContent++
  }

  complete(target) {
    this.element.querySelector('.task-name').classList.toggle('strike-through')
    this.isCompleted = !this.isCompleted
    tasks.get(this.taskID).isCompleted = this.isCompleted
    localStorage.setItem(
      'taskData',
      JSON.stringify(Array.from(tasks.entries())),
    )
    this.isCompleted
      ? completedTasks.textContent++
      : completedTasks.textContent--
    if (target) return
    this.element.querySelector('.check-task-btn').checked =
      !this.element.querySelector('.check-task-btn').checked
  }

  delete() {
    this.element.remove()
    tasks.delete(this.taskID)
    localStorage.setItem(
      'taskData',
      JSON.stringify(Array.from(tasks.entries())),
    )
    totalTasks.textContent--
  }

  check() {
    if (this.isCompleted) {
      this.element.querySelector('.task-name').classList.add('strike-through')
      this.isCompleted = true
      this.element.querySelector('.check-task-btn').checked = true
      completedTasks.textContent++
    }
  }

  addEventListeners() {
    this.element
      .querySelector('.delete-task-btn')
      .addEventListener('click', () => {
        this.delete()
      })

    this.element
      .querySelector('.check-task-btn')
      .addEventListener('click', (e) => {
        this.complete(e.target.type)
      })

    this.element.querySelector('.task-name').addEventListener('click', () => {
      this.complete()
    })
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!taskInput.value.trim()) return
  const taskID = Math.random().toString(16).slice(2)
  tasks.set(taskID, {
    taskID: taskID,
    taskName: taskInput.value.trim(),
    priority: 'normal',
    dueDate: null,
    createdAt: new Date().toLocaleString(),
    isCompleted: false,
  })
  new Task(taskID, taskInput.value.trim(), 'normall', null, tasks.get(taskID).createdAt).init()
  localStorage.setItem('taskData', JSON.stringify(Array.from(tasks.entries())))
  taskInput.value = ''
})

function loadTasks() {
  const stored = localStorage.getItem('taskData');
  if (!stored) return
  new Map(JSON.parse(stored)).forEach((task) => {
    new Task(
      task.taskID,
      task.taskName,
      task.priority,
      task.dueDate,
      task.createdAt,
      task.isCompleted,
    )
      .init()
      .check()
  })
}
loadTasks()
