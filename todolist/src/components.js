const { createDeleteHandler, createDoneHandler } = require('./handlers')

function Todo (todo, todos, render) {
  const todoItem = document.createElement('li')
  todoItem.className = 'todo-item'

  const span = document.createElement('span')
  span.innerHTML = todo.text
  todoItem.appendChild(span)

  const deleteButton = document.createElement('button')
  deleteButton.innerHTML = 'Delete'
  deleteButton.addEventListener('click', createDeleteHandler(todos, todo, render))
  todoItem.appendChild(deleteButton)

  if (!todo.completed) {
    const doneButton = document.createElement('button')
    doneButton.innerHTML = 'Done'
    doneButton.addEventListener('click', createDoneHandler(todos, todo, render))
    todoItem.appendChild(doneButton)
  }

  return todoItem
}

module.exports = {
  Todo
}
