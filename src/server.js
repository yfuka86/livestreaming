import express from 'express'
import http from 'http'
import path from 'path'
import io from 'socket.io'

const app = express()

app.get('/distributor', (req, res) => {
  res.sendFile('distributor.html', { root: path.join(__dirname, '../') })
})

app.get('/listener', (req, res) => {
  res.sendFile('listener.html', { root: path.join(__dirname, '../') })
})

app.use('/static', express.static('static'));

const port = process.env.PORT || 3000

const server = http.Server(app).listen(port, () => {
  console.log('listening')
})

export default io(server).set('transports', [
  'websocket',
  'polling'
])
