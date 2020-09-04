import React from 'react'
import { useHistory } from "react-router-dom"

export default function Rooms (props) {  
let history = useHistory()


function handleAddRoom () {
  const newRoom = prompt('Enter a room name')
  history.push("/rooms/" + newRoom)
}

  return (
    <div id='rooms'>
      <button onClick={handleAddRoom}>Add Room</button>
      <label htmlFor='room-select'>Change Room:</label>
      <select onChange={(evt) => history.push("/rooms/" + evt.target.value)} name='room' id='room-select'>
        <option value=''>--Select a Room--</option>
        {props.rooms.map(room => <option key={room} value={room}>{room}</option>)}
      </select>
    </div>
  )
}
