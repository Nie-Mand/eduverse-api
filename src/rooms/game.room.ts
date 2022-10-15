import { Room, Client } from 'colyseus'
import { StateHandler } from '../core'
import { Player } from '../schemas/player.schema'

export class GameRoom extends Room<StateHandler> {
  maxClients = 8

  onCreate() {
    this.setSimulationInterval(() => this.onUpdate())
    this.setState(new StateHandler())

    this.onMessage('key', (client, message) => {
      const player = this.state.players.get(client.sessionId)
      if (!player) return
      player.pressedKeys = message
    })
  }

  onJoin(client: any) {
    const player = new Player()
    player.name = `Player ${this.clients.length}`
    player.position.x = Math.random()
    player.position.y = Math.random()
    player.position.z = Math.random()

    this.state.players.set(client.sessionId, player)
  }

  onUpdate() {
    this.state.players.forEach(player => {
      player.position.x += player.pressedKeys.x * 0.1
      player.position.z -= player.pressedKeys.y * 0.1
    })
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId)
  }

  onDispose() {}
}
