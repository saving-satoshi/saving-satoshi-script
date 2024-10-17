import { Dispatch, SetStateAction } from 'react'
import { SuccessNumbers } from 'types'
import { TokenTypes, LessonDirection, LessonView } from './enums'

export interface OpRunnerTypes {
  success: boolean | SuccessNumbers
  setSuccess: Dispatch<SetStateAction<number | boolean>>
  children?: React.ReactNode
  readOnly?: boolean
  prePopulate?: boolean
  advancedChallenge?: boolean
  initialHeight?: number
  initialStackSuccess?: string
  nextStepMessage?: string
}

export interface LessonContextType {
  direction: LessonDirection
  activeView: LessonView
  setActiveView: (view: LessonView) => void
}

export interface Token {
  type: TokenTypes
  resolves: string | number | boolean | null
  value: string
}

export interface Operation {
  tokenType?: TokenTypes | null
  resolves?: string | number | boolean | null
  value?: string | null
  type: any
}

export interface State {
  stack: any[]
  operation: Operation
  step: number
  negate: number
  height?: number | null
  brodcastHeight?: number | null
  error?: RunnerError
}

export interface RunnerError {
  type: string
  message: string | null
}
