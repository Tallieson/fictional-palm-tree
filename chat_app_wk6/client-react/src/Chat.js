import React from 'react'

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
  return (
    <div id='chatroom'>
      <ul id='messages'>
        {props.messages.filter(msg => msg.room === props.room).map((msg, i) => <Message message={msg} key={i} />)}
      </ul>
    </div>
  )
}
