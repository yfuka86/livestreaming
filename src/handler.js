import io from './server'
import _ from 'lodash'
import redis from 'redis'

const REDIS_HOST = '127.0.0.1';
const REDIS_PORT = 6379;
const REDS_PASS = '';

var redis_client = redis.createClient(REDIS_PORT, REDIS_HOST, { auth_pass: REDS_PASS });

redis_client.subscribe('create_msg');
redis_client.on('message', (channel, raw_params) => {
  var params = JSON.parse(raw_params);
  io.to(params.id).emit("create_mes", params);
});

export default function handler (socket) {
  console.log('a user connected');
  socket.userId = null

  socket.on('start distribution', (id) => {
    console.log('the user start distribute #' + id)
    socket.join(id)

    const broadcast = function(data) {
      io.to(id).emit('stream', data);
    }
    socket.on('stream', broadcast);

    socket.once('stop distribution', (id) => {
      console.log('the user stop distribute #' + id)
      socket.removeListener('stream', broadcast)
      socket.leave(id)
    })
  })

  socket.on('start listening', (id) => {
    console.log('the user start listen #' + id)
    socket.join(id)

    socket.once('stop listening', (id) => {
      console.log('the user stop listen #' + id)
      socket.leave(id)
    })
  })

  socket.on('disconnect', () => {
    socket.removeAllListeners()
  })
}
