import io from './server'
import _ from 'lodash'

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
