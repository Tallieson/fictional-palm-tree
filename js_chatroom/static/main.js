// to GET and POST messages, we use javascript's built-in function "fetch"
// fetch returns a "promise", which is a fancy object representing an asynchronous computation
// We call ".then" and ".catch" on the promise object where we can register success and error callbacks respectively.
const yo = require('yo-yo')


function postMessage (text) {
    console.log('posting message')
    fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text, date: new Date() })
    })
      .then(data => {
        console.log('Success:', data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  function getMessages () {
    fetch('/messages')
      .then(response => response.json())
      .then(data =>{
        //get data render to the DOM using yo.
        // .forEach(todo => todolist.appendChild(todo)
          return yo`<ul>
            ${data.map(function (message){
              return yo`<li class="todo-item">
              <span>${message.text}</span>
              </li>`
            })}
            </ul>`
      })
  }
  messageContainer.appendChild(getMessages())
  // here is an example of how to send a POST request using the postMessage function:
  // postMessage('hello')
  
  // here we call getMessages because the first thing we want to do when loading the page is get all previous messages.
  getMessages()