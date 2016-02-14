import io from 'socket.io'
import _ from 'lodash'

export default function handler (socket) {
  console.log('a user connected');
  socket.userId = null

  socket.on('start distribution', (id) => {
    console.log('the user start distribution #' + id)
    socket.join(id)

    const broadcast = function(data) {
      io.sockets.to(id).emit('stream', data);
    }
    socket.on('stream', broadcast);

    socket.once('stop distribution', (id) => {
      socket.removeListener('stream', broadcast)
      socket.leave(id)
    })
  })

  socket.on('start listen', (id) => {
    console.log('the user start listen #' + id)
    socket.join(id)

    socket.once('stop listen', (id) => {
      socket.leave(id)
    })
  })

  socket.on('disconnect', () => {
    socket.removeAllListeners()
  })
}
