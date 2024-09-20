import * as Enums from './enums'
import * as Interfaces from './interfaces'

export * from './enums'
export * from './interfaces'

export type TabData = {
  id: string
  text: string
  disabled?: boolean
}

export type T = Array<Interfaces.Token>

export type ScriptType = Array<string | boolean | number | null>

export type MainState = Interfaces.State[]

export type StackType = Array<string | boolean | number | null>

export type SuccessNumbers = 0 | 1 | 2 | 3 | 4 | 5 | 6
