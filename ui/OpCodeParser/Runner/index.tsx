'use client'

import clsx from 'clsx'
import { useMediaQuery, useTranslations } from 'hooks'
import { useRef, useState, useEffect } from 'react'
import { LessonView, SuccessNumbers, HasherState } from 'types'
import { useLessonContext, StatusBar, Loader, Icon, Button } from 'ui'
import { sleep } from 'utils'

export interface OpCodeRunnerType {
  lang: string
  handleRun: () => void
  handleCopy: () => void
  handleTryAgain?: () => void
  success: boolean | SuccessNumbers | null
  errorMessage?: string
  nextStepMessage?: string
}

export default function OpCodeRunner({
  lang,
  handleCopy,
  handleRun,
  handleTryAgain,
  success,
  errorMessage,
  nextStepMessage,
}: OpCodeRunnerType) {
  const t = useTranslations(lang)
  const { activeView } = useLessonContext()
  const isActive = activeView !== LessonView.Info
  const [hasherState, setHasherState] = useState<
    SuccessNumbers | boolean | null
  >(0)
  const isSmallScreen = useMediaQuery({ width: 767 })

  const [clicked, setClicked] = useState<boolean>(false)

  const handleRunClick = () => {
    handleRun()
  }

  const handleCopyClick = async () => {
    setClicked(true)
    handleCopy()
    await sleep(1000)
    setClicked(false)
  }

  const handleTryAgainClick = () => {
    setHasherState(0)
    handleTryAgain && handleTryAgain()
  }

  useEffect(() => {
    setHasherState(success)
  }, [success])

  return (
    <div className="flex">
      <div
        className={clsx(
          'flex h-14 min-h-14 w-full items-start border-t border-white border-opacity-30 bg-black/20',
          {
            'hidden md:flex': activeView === LessonView.Info || !isActive,
            flex: isActive,
          }
        )}
      >
        <button
          disabled={hasherState === 1}
          className={clsx(
            'flex h-full items-center justify-start gap-3 p-0 px-4 font-mono text-white',
            {
              'bg-green/15': hasherState === 5,
            }
          )}
          onClick={hasherState !== 5 ? handleRunClick : handleTryAgainClick}
        >
          {((hasherState === 0 ||
            hasherState === 2 ||
            hasherState === 3 ||
            hasherState === 6 ||
            hasherState === 5) && (
            <div
              className={clsx(
                'flex h-6 w-6 items-center justify-center rounded-sm bg-white',
                {
                  'px-2 py-1.5': hasherState !== 5,
                  'px-0.5 py-0.5': hasherState === 5,
                }
              )}
            >
              <Icon
                icon={hasherState !== 5 ? 'play' : 'refresh'}
                className="h-full w-full object-contain text-[#334454]"
              />
            </div>
          )) || (
            <div className="flex h-6 w-6 items-center justify-center rounded-sm">
              <Loader className="h-full w-full object-contain" />
            </div>
          )}
        </button>
        <StatusBar
          beginMessage={t('opcode.run')}
          handleTryAgain={handleTryAgain}
          errorMessage={errorMessage || ''}
          className={clsx('h-14 min-h-14 grow border-t-0', {
            '!bg-transparent': success !== true && success !== 5,
          })}
          textClass="text-lg !p-0"
          success={success}
          hints
        />
        {hasherState === 5 && (
          <Button classes="whitespace-nowrap h-full" onClick={handleCopyClick}>
            {clicked ? 'Copied' : 'Copy'}
          </Button>
        )}
      </div>
    </div>
  )
}
