import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import { Server } from 'colyseus'
import { WebSocketTransport } from '@colyseus/ws-transport'
import { createServer } from 'http'
import { GameRoom } from './rooms/game.room'

const port = process.env.PORT || 6900

const app = express()
app.use(cors())
app.use(json())

const server = createServer(app)
const gameServer = new Server({
  transport: new WebSocketTransport({
    server,
  }),
})

gameServer.define('lobby', GameRoom)

app.get('/', (_req, res) => {
  return res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
