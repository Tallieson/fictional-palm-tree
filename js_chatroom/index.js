const path = require('path')
const express = require('express')
app = express()
const port = 8000

// app.use(express.static(path.join(__dirname + 'static')))

app.listen(port, () => console.log(`Server runnin on ${port}`))

// const http = require('http')
// const fs = require('fs')
// const path = require('path')
// const st = require('st') // st is a useful module to make serving static files easier
// const Router = require('http-hash-router') // this module makes defining HTTP routes easier

// const port = 8000

// // This is where messages will be stored.
// const MESSAGES_PATH = './messages.txt'

// const mount = st({ path: path.join(__dirname, '/static'), url: '/static' })
// const router = Router()

// // going to /static/<file-name> will serve the file <file-name>
// router.set('/static/*', mount)

// // requests to /messages are either a GET or a POST
// router.set('/messages', function (req, res) {
//   if (req.method === 'GET') {
//     getMessages(req, res)
//   } else if (req.method === 'POST') {
//     postMessage(req, res)
//   } else {
//     res.statusCode = 400
//     res.end('unsupported operation')
//   }
// })

// // this is the POST handler for /messages
// // this function should write a new message to the file
// function postMessage (req, res) {
//   let data = ''
//   req.on('data', function (chunk) {
//     data += chunk
//   })

//   req.on('end', function () {
//     fs.appendFile(MESSAGES_PATH, "\n" + data, (err) => {
//         if (err){
//             console.log(err)
//             res.statusCode = 500
//             res.end('Message failed to post')
//         }
//         else{
//             res.statusCode = 200
//             res.end('Message posted successfully')
//         }
        
//     })
//     // After writing to the file, we need to send up a response
//   })
// }

// // this is the GET handler for /messages
// // this function should respond with the list of messages
// function getMessages (req, res) {
//   // TODO: write code here to get your messages from the file
//   // hint: use fs.readFile
//   fs.readFile(MESSAGES_PATH, 'utf8',(err, data) => {
//       if(err){
//           console.log(err)
//           res.statusCode = 500
//           res.end('Failed to get messages')
//         }
//         else{
// // you will need to split on newlines, filter out empty strings, and JSON.parse each object
//       const messages = data
//         .split('\n')
//         .filter(line => line) // truthy falsy check to make sure the line of the text file is present to filter out empty values
//         .map(JSON.parse)
//       res.writeHead(200, { 'Content-Type': 'application/json' })
//       res.end(JSON.stringify(messages))
//     }
//     })
// }

// const server = http.createServer((req, res) => {
//   router(req, res, {}, function onError (err) {
//     if (err) {
//       res.statusCode = err.statusCode || 500
//       res.end(err.message)
//     }
//   })
// })

// server.listen(port)

// console.log('server listening on port:', port)