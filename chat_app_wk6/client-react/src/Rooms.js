import React from 'react'

export default function Rooms (props) {
  return (
    <div id='rooms'>
      <button onClick={props.handleAddRoom}>Add Room</button>
      <label htmlFor='room-select'>Change Room:</label>
      <select onChange={props.handleChangeRoom} name='room' id='room-select' value={props.room}>
        <option value=''>--Select a Room--</option>
        {props.rooms.map(room => <option key={room} value={room}>{room}</option>)}
      </select>
    </div>
  )
}
