import React from 'react'
import { useParams } from 'react-router-dom'
import MessageForm from './MessageForm'

function Message (props) {
  return (
    <li className='message-item'>
      <span className='date'>{(new Date(props.message.date)).toLocaleString()}</span>
      <span className='nick'> {props.message.nick}: </span>
      <span className='text'>{props.message.text}</span>
    </li>
  )
}

export default function Chat (props) {
  let { room } = useParams();
  return (
    <div id='chatroom'>
      <h1>Welcome to {room} Chat</h1>
      <ul id='messages'>
        {props.messages.filter(msg => msg.room === room).map((msg, i) => <Message message={msg} key={i} />)}
      </ul>

      <MessageForm room={room} sendMessage={props.sendMessage}/>
    </div>
  )
}
