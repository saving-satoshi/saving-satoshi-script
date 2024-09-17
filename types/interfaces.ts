import { Dispatch, SetStateAction } from 'react'
import { SuccessNumbers } from './index.ts'

export interface OpRunnerTypes {
  lang: any
  answerScript: string[]
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

interface Token {
  type: TokenTypes
  resolves: string | number | boolean | null
  value: string
}

export interface State {
  stack: any[]
  operation: Operation
  step: number
  negate: number
  height?: number | null
  error?: RunnerError
}

export interface Operation {
  tokenType?: TokenTypes | null
  resolves?: string | number | boolean | null
  value?: string | null
  type: any
}

export interface RunnerError {
  type: string
  message: string | null
}
