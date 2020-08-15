const { createDeleteHandler, createDoneHandler } = require('./handlers')
const yo = require('yo-yo')

function Todo (todo, todos) {
  return yo`<ul>
    ${todos.map(function (todo){
      return yo`<li class="todo-item">
      <span>${todo.text}</span>
      <button id="deleteButton" onclick=${deleteButton}>Delete</button>
      ${todo.completed ? '' : yo`<button id="doneButton" onclick=${doneButton}>Done</button>`}
      </li>`
    })}
    </ul>`
  }

  const deleteButton = deleteButton.addEventListener('click', createDeleteHandler(todos, todo, render))
  const doneButton = doneButton.addEventListener('click', createDoneHandler(todos, todo, render))


module.exports = {
  Todo
}
