const { createAddHandler } = require('./handlers')
const { renderTodos } = require('./render')
const yo = require('yo-yo')

const todolist = document.getElementById('todos')
const addTodo = document.getElementById('add-todo')
const showAll = document.getElementById('show-all')
const showCompleted = document.getElementById('show-completed')
const showIncomplete = document.getElementById('show-incomplete')

const filterCompleted = todo => todo.completed
const filterIncomplete = todo => !todo.completed
const filterAll = _ => true

let filter = filterAll

const todos = [
  { text: 'do the dishes', completed: true },
  { text: 'take out the trash', completed: false }
]

function getNewTodoText () { return addTodo.children[0].value }

const el = Todos(todos, filter, update)

function update() { yo.update(el, Todos(todos, filter, update))}
// setup handlers
addTodo.onsubmit = createAddHandler(todos, getNewTodoText, rerender)
showAll.onclick = () => { filter = filterAll; rerender() }
showCompleted.onclick = () => { filter = filterCompleted; rerender() }
showIncomplete.onclick = () => { filter = filterIncomplete; rerender() }

// initial render
renderTodos(todolist, todos, filter, rerender)
