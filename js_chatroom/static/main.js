// to GET and POST messages, we use javascript's built-in function "fetch"
// fetch returns a "promise", which is a fancy object representing an asynchronous computation
// We call ".then" and ".catch" on the promise object where we can register success and error callbacks respectively.
const yo = require('yo-yo')

// Username prompt
let nick = prompt("Please enter your name")
// room variable
let room = null

// add event listen to send message button
document.getElementById("sendMessage")
// create a callback function, to process data from form fields before calling postMessage function
  .addEventListener("submit", (event) => {
    event.preventDefault()
    let text = document.getElementById("messageText").value
    postMessage(text, nick)
})

function getRooms(){
  fetch('/messages')
    .then(response => response.json())
    // Callback function when we receive the data
    .then(messages =>{
      yo.update(drop, renderRooms(messages))
    }
  )}

function postMessage (text, nick) {
    console.log('posting message')
    fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        room: room,
        text: text, 
        nick: nick, 
        date: new Date()
      })
    })
      .then(data => {
        console.log('Success:', data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
function getMessages () {
  console.log(room)
  fetch('/messages')
  .then(response => response.json())
  // Callback function when we receive the data
  .then(data =>{
    console.log('fetching')
    // filter returns true or false - the argument that filter callback takes in is an instance of data. callback returns True or False
    data = data.filter((message) => message.room == room)
    // updating the contents of the DOM element with the value returned by the 2nd argument
    yo.update(el, render(data))
  })
}

function render(messages){
  return yo`
    <div id=“messageContainers”>
      <ul>
        ${messages.map(function(message){
          return yo`
            <li>
            <span class="message_sender">${message.nick}</span> : 
            <span class="message_text">${message.text}</span> 
            <span class="message_date">${message.date}</span>
            </li>`
        })}
    </ul>
    </div>
  `
}

function renderRooms(messages){
  let dropdown = yo`
      <form id="selectRoom">
        <label for="rooms">Choose a chat room:</label>
          <select name="rooms" id="rooms">
            ${messages.map(function(message){
              return yo`
                <option value="${message.room}">${message.room}</option>`
            })}
          </select>
        <button type="submit">Send</button>
      </form>`
  // Select chat room
  dropdown.addEventListener("submit", (event) => {
  event.preventDefault()
  room = document.getElementById("rooms").value
  getMessages(room)
})
  return dropdown
}

getRooms()
// inital call, passing empty array because we don't have data
const drop = renderRooms([])
// returned from asyncronous GetMessages function
const el = render([])

// append new instance of render function to the DOM
document.body.appendChild(drop)
document.body.appendChild(el)

window.setInterval(getMessages, 1000)

module.exports = {
  postMessage, 
  getMessages}