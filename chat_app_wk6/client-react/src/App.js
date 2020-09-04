/* globals fetch prompt */
import Chat from './Chat'
import Rooms from './Rooms'
import MessageForm from './MessageForm'
import LoginForm from './LoginForm'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import io from 'socket.io-client'

const socket = io()

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { messages: [], nick: null }
  }

  componentDidMount () {
    socket.on('chat message', msg => {
      console.log('Got a message:', msg)
      this.setState({ messages: this.state.messages.concat(msg) })
    })

    // Get initial list of messages
    fetch('/messages')
      .then(response => response.json())
      .then(data => {
        console.log('fetched data from server')
        this.setState({ messages: data })
      })
  }

  loginFunc(nick, password) {
    this.setState({nick: nick})
  }

  sendMessage (text, messageRoom) {
    const message = { text: text, nick: this.state.nick, room: messageRoom, date: new Date() }
    socket.emit('chat message', message)
  }

  handleAddRoom () {
    const room = prompt('Enter a room name')
    this.setState({ room: room })
  }

  getRooms () {
    const rooms = this.state.messages.map(msg => msg.room)
    rooms.push(this.state.room) // we have to add the currentRoom to the list, otherwise it won't be an option if there isn't already a message with that room
    const filtered = rooms.filter(room => room) // filter out undefined or empty string
    return Array.from(new Set(filtered)) // filters out the duplicates
  }

  render () {
    return (
      <Router>
        <div>
        <h2>Links</h2>
        <ul>
          <li>
            <Link to="/signup">signup</Link>
          </li>
          <li>
            <Link to="/logout">Log out</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/rooms/general">Chat</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/signup">
          
          </Route>

          <Route path="/logout" >

          </Route>

          <Route path="/login">
            <LoginForm loginFunc={this.loginFunc.bind(this)}/>
          </Route>
          <Route path="/rooms/:room">
            <Chat sendMessage={this.sendMessage.bind(this)} messages={this.state.messages}/>
          </Route>
          <Route path="/">
            <Rooms
            rooms={this.getRooms()}
            handleAddRoom={this.handleAddRoom.bind(this)}
            />
          </Route>
        </Switch>

    </div>
    </Router>
    )
  }
}

export default App
