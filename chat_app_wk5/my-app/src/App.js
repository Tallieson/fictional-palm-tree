/* globals prompt fetch */
import React from 'react'
import Chat from './components'

const io = require('socket.io-client')
const socket = io()
const nickname = prompt('Enter your nickname:')

function Message (props){
  return( 
  <li>
    <span>{props.message.nick} : </span>{props.message.text}
    </li>
  )
}

function Chatter(props) {
  console.log(props.messages)
  return (
    <ul>
      {props.messages.map((msg, index) => <Message key={index} message={msg}/>)}
    </ul>
  )
}

class MessageForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      text: '',
      nick: props.nick,
      room: props.room,
      date: ''
    }
    // 
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // gets us acess to the sendMessage function, now with 'Apps' parameters bound to it
    this.sendMessage = this.props.func
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.sendMessage({
      "text":this.state.text,
      "nick":this.state.nick,
      "room":this.state.room,
      "date":new Date(),
    })
    this.setState({
      text: ''
    })
  }

  render(){
    return(
      <form onSubmit= {this.handleSubmit}>
        <input type='text' value={this.state.text} onChange={this.handleChange}></input>
        <input type='submit' value='Send Message'></input>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
    messages: [],
    nick: nickname,
    room: "home"
  }
  //binding this function uses the state of this form, rather then the state of where it's called
  // otherwise it would only have access to the state in the constructor it is called from
  this.sendMessage = this.sendMessage.bind(this)

  socket.on('chat message', msg => {
    console.log('Got a message:', msg)
    let finalMessages = this.state.messages
    finalMessages.push(msg)
    this.setState({
      messages: finalMessages
    })

  })
  }

  sendMessage(finalMessage){
    console.log(finalMessage)
    socket.emit('chat message', finalMessage)
  }

 //runs as soon as the component is mounted to the DOM
  componentDidMount(){
    fetch('/messages')
    .then(response => response.json())
    .then(messages => {
      console.log(messages)
      this.setState({messages: messages})
    })
  }

  render(){  
    console.log(this.state)
    return(
    <div>
        <Chatter messages={this.state.messages}/>
        {/* passing sendMessage so we can get access to this constructors state where it is called */}
        <MessageForm nick={this.state.nick} room={this.state.room} func={this.sendMessage}/>
    </div>
    )
  }
}


export default App
  