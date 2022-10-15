import { Room, Client } from 'colyseus'
import { StateHandler } from '../core'
import { Player } from '../schemas/player.schema'

interface PlayerData {
  name: string
  skin: string
}

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

  onJoin(client: any, options: PlayerData) {
    if (!options.name || !options.skin) return
    const player = new Player()
    player.name = options.name
    player.skin = options.skin
    player.position.x = Math.random()
    player.position.y = Math.random()
    player.position.z = Math.random()

    this.state.players.set(client.sessionId, player)
  }

  onUpdate(client: any, options: any) {
    if (this.state.players.has(client.sessionId)) {
      const player = this.state.players.get(client.sessionId)
      if (!player) return
      player.position.x += player.pressedKeys.x
      player.position.y += player.pressedKeys.y
    }
  }

  onLeave(client: Client) {
    if (this.state.players.has(client.sessionId)) {
      this.state.players.delete(client.sessionId)
    }
  }

  onDispose() {}
}
