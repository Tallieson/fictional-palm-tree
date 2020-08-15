function createDeleteHandler (todos, todo, render) {
  return function () {
    const index = todos.findIndex(item => item.text === todo.text)
    todos.splice(index, 1)
    render()
  }
}

function createDoneHandler (todos, todo, render) {
  return function () {
    const index = todos.findIndex(item => item.text === todo.text)
    todos[index].completed = true
    render()
  }
}

function createAddHandler (todos, getNewTodoText, render) {
  return evt => {
    evt.preventDefault()
    const newTodoText = getNewTodoText()
    todos.push({ text: newTodoText, completed: false })
    render()
  }
}

module.exports = {
  createDeleteHandler,
  createAddHandler,
  createDoneHandler
}
