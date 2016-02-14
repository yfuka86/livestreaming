import server from './src/server'
import handler from './src/handler'

server.on('connection', handler)
