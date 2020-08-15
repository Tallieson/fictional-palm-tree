const test = require('tape')
const { Todo } = require('../src/components')

test('clicking "Add Todo" button should add a todo item to the list', t => {
  const addTodo = document.getElementById('add-todo')
  const intialNumberOfTodos = document.getElementsByClassName('todo-item').length

  addTodo.requestSubmit()
  const numberOfTodosAfterSubmit = document.getElementsByClassName('todo-item').length

  t.equal(numberOfTodosAfterSubmit, intialNumberOfTodos + 1)
  t.end()
})

test('clicking a todo\'s delete button should remove that todo item from the list', t => {
  const todos = document.getElementsByClassName('todo-item')
  const intialNumberOfTodos = todos.length

  todos[0].children[1].click()

  t.equal(todos.length, intialNumberOfTodos - 1)
  t.end()
})

test('Todo should return a list-item DOM node with the correct text', t => {
  const todo = { text: 'hello', completed: false }
  const todos = [todo]
  const render = function() {}

  const li = Todo(todo, todos, render)

  t.equal(li.children[0].textContent, todo.text)
  t.end()
})