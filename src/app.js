console.log('ToDo List')
const todos = document.querySelector('.todos')
const form = document.querySelector('.input-block')
const taskInput = document.querySelector('#task-input')
const tasks = []

class Task {
  constructor(taskName) {
    this.taskName = taskName
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
  
  check() {
    this.element.querySelector('.task-name').classList.toggle('strike-through')
  }

  delete() {
    this.element.remove()
  }

  addEventListeners() {
    this.element
      .querySelector('.delete-task-btn')
      .addEventListener('click', () => {this.delete()})

    this.element
      .querySelector('.check-task-btn')
      .addEventListener('click', () => {this.check()})
  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!taskInput.value.trim()) return
  tasks.push(new Task(taskInput.value.trim()).init())
  taskInput.value = ''
})
