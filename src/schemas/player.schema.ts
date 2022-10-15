import { Schema, type } from '@colyseus/schema'

export interface PressedKeys {
  x: number
  y: number
}

export class Position extends Schema {
  @type('number') x = 0
  @type('number') y = 0
  @type('number') z = 0
}

export class Player extends Schema {
  @type('string') name: string
  @type(Position) position = new Position()

  pressedKeys: PressedKeys = { x: 0, y: 0 }
}
