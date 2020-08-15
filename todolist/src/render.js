const { Todo } = require('./components')

function renderTodos (todolist, todos, filter, rerender) {
  // clear the currently rendered list
  todolist.innerHTML = ''

  // render the new list
  todos
    .filter(filter)
    .map(todo => Todo(todo, todos, rerender))
    .forEach(todo => todolist.appendChild(todo))
}

module.exports = {
  renderTodos
}
