import express from 'express'
import http from 'http'
import io from 'socket.io'

const app = express()

app.get('/distributor', (req, res) => {
  res.sendfile('distributor.html')
})

app.get('/listener', (req, res) => {
  res.sendfile('listener.html')
})

const port = process.env.PORT || 3000

const server = http.Server(app).listen(port, () => {
  console.log('listening')
})

export default io(server).set('transports', [
  'websocket',
  'polling'
])
