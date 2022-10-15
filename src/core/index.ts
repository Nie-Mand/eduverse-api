import { Schema, type, MapSchema } from '@colyseus/schema'
import { Player } from '../schemas/player.schema'

export class StateHandler extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>()
}
