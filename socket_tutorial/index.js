var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(3000, () => {
  console.log('listening on *:3000');
})

app.get('/', (req, res) => {
    // __dirname returns directory of current file. So this serves the html file in the same folder as a response
  res.sendFile(__dirname + '/index.html');
});

// Socket connection event
io.on('connection', (socket) => {
    console.log('a user connected');
    // Disconnection event
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  
//log out chat messages and emit it to every open socket, including senders
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});