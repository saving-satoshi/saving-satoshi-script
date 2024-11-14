'use client'

import { useState, Suspense } from 'react'
import {
  LessonInfo,
  LessonCopy,
  OpCodeParser,
  LessonFallback,
  Loader,
} from 'ui'
import { SuccessNumbers } from 'types'

export default function Home() {
  const [success, setSuccess] = useState<boolean | SuccessNumbers>(0)

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-tl from-[#486c72] to-[#516644]">
      <Suspense
        fallback={
          <div className="flex h-full flex-col md:flex-row">
            <div className="max-w-full grow justify-center overflow-y-auto text-white md:max-w-[50%] md:basis-1/3">
              <div className="flex flex-col content-center gap-1 overflow-y-auto px-1 py-6 sm:px-12">
                <LessonFallback />
              </div>
            </div>
            <div className="max-w-full grow justify-center overflow-y-auto text-white md:max-w-[50%] md:basis-1/3">
              <div className="flex hidden h-[calc(100vh-48px)] items-center justify-center border-white/25 md:flex md:h-[calc(100vh)] md:max-w-[50vw] md:border-l">
                <div className="h-12 w-12">
                  <Loader />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <OpCodeParser success={success} setSuccess={setSuccess}>
          <LessonInfo>
            <Suspense fallback={<LessonFallback />}>
              <LessonCopy />
            </Suspense>
          </LessonInfo>
        </OpCodeParser>
      </Suspense>
    </div>
  )
}
