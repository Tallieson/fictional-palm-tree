import React from 'react'

class MessageForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { formValue: '' }
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.sendMessage(this.state.formValue, this.props.room)
  }

  handleChange (event) {
    this.setState({ formValue: event.target.value })
  }

  render () {
    return (
      <form id='send-message' onSubmit={this.handleSubmit.bind(this)}>
        <input id='message-text' type='text' placeholder='message...' value={this.state.formValue} onChange={this.handleChange.bind(this)} />
        <button type='submit'>Send</button>
      </form>
    )
  }
}

export default MessageForm
