'use client'

import { useState, Suspense } from 'react'
import { useTranslations, useLang } from 'hooks'
import { LessonInfo, LessonCopy, OpCodeParser, HeroTitle, Icon } from 'ui'
import { SuccessNumbers } from 'types'

export default function Home() {
  const lang = useLang()
  const t = useTranslations(lang)
  const [success, setSuccess] = useState<boolean | SuccessNumbers>(0)

  const LessonFallback = () => {
    return (
      <div className="flex flex-col gap-5 font-nunito md:pt-5">
        <div className="flex flex-row gap-[15px]">
          <HeroTitle />
          <Icon icon="cross" className="flex items-center" />
          <h1 className="text-[24px] font-bold">{t('homepage.title')}</h1>
        </div>
      </div>
    )
  }

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
