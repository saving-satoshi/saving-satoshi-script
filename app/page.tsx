'use client'

import { useState, Suspense } from 'react'
import { LessonInfo, LessonCopy, OpCodeParser, LessonFallback } from 'ui'
import { SuccessNumbers } from 'types'

export default function Home() {
  const [success, setSuccess] = useState<boolean | SuccessNumbers>(0)

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-tl from-[#486c72] to-[#516644]">
      <OpCodeParser success={success} setSuccess={setSuccess}>
        <LessonInfo>
          <Suspense fallback={<LessonFallback />}>
            <LessonCopy />
          </Suspense>
        </LessonInfo>
      </OpCodeParser>
    </div>
  )
}
