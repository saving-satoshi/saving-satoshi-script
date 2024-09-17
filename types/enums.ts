import { Dispatch, SetStateAction } from 'react'
import { SuccessNumbers } from 'ui/common/StatusBar'

export enum LessonDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum LessonView {
  Info = 'info',
  Code = 'code',
  Execute = 'execute',
}

export enum InjectableComponentType {
  A,
  Link,
  Tooltip,
  LineBreak,
  Span,
}

export enum TokenTypes {
  INITIAL_STACK = 'initial-stack',
  CONSTANT = 'constant',
  ARITHMETIC = 'arithmetic',
  DATA_PUSH = 'data-push',
  LOCK_TIME = 'lock-time',
  CONDITIONAL = 'conditional',
  CRYPTO = 'crypto',
  BITWISE = 'bitwise',
  STACK = 'stack',
  DEFAULT = 'default',
}

export enum Status {
  Begin,
  InProgress,
  Error,
  Poor,
  Good,
  Success,
  NextStep, // Step on Advance Challenge in OpRunner
}
