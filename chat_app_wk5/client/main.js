/* globals prompt fetch */
const { Chat } = require('./components')
const yo = require('yo-yo')
const io = require('socket.io-client')
const socket = io()

const nickname = prompt('Enter your nickname:')

socket.on('chat message', msg => {
  console.log('Got a message:', msg)
  updateState('messages', state.messages.concat(msg))
})

const sendForm = document.getElementById('send-message')
const messageTextField = document.getElementById('message-text')
sendForm.onsubmit = evt => {
  evt.preventDefault()
  const message = { text: messageTextField.value, nick: nickname, room: state.room, date: new Date() }
  socket.emit('chat message', message)
}

const state = {
  room: '',
  messages: []
}

function updateState (key, value) {
  state[key] = value
  yo.update(el, Chat(state.messages, state.room, updateState))
}

const el = Chat(state.messages, state.room, updateState)
const chatContainer = document.getElementById('chat-container')
chatContainer.appendChild(el)

// Get initial list of messages
fetch('/messages')
  .then(response => response.json())
  .then(data => {
    console.log('fetched data from server')
    updateState('messages', data)
  })
