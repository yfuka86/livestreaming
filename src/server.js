import express from 'express'
import http from 'http'
import path from 'path'
import io from 'socket.io'

const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
  next();
})

app.get('/distributor', (req, res) => {
  res.sendFile('distributor.html', { root: path.join(__dirname, '../') })
})

app.get('/listener', (req, res) => {
  res.sendFile('listener.html', { root: path.join(__dirname, '../') })
})

app.use('/static', express.static('static'));

const port = process.env.PORT || 5001

const server = http.Server(app).listen(port, () => {
  console.log('listening')
})

export default io(server).set('transports', [
  'websocket',
  'polling'
])
