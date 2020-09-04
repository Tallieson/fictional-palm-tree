module.exports = function (deps) {
  const fs = require('fs')
  const express = require('express')

  const app = express()

  app.use(express.static('static'))
  app.use(express.json())

  app.get('/messages', (req, res) => {
    fs.readFile(deps.messagesPath, 'utf8', (err, text) => {
      if (err) return res.status(500).send(err)

      const messages = text
        .split('\n')
        .filter(txt => txt) // will filter out empty string
        .map(JSON.parse)

      return res.json(messages)
    })
  })

  app.post('/messages', (req, res) => {
    // console.log(req)
    const message = JSON.stringify(req.body)
    fs.appendFile(deps.messagesPath, '\n' + message, err => {
      if (err) return res.status(500).send(err)

      return res.send('post successful')
    })
  })

  const http = require('http').createServer(app)
  const io = require('socket.io')(http)

  io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg)
      fs.appendFile(deps.messagesPath, '\n' + JSON.stringify(msg), err => err ? console.log(err) : null)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

  return http
}
