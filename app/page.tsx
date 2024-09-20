'use client'

import { useState } from 'react'
import { LessonInfo, OpCodeParser } from 'ui'
import { SuccessNumbers } from 'types'

export default function Home() {
  const [success, setSuccess] = useState<boolean | SuccessNumbers>(0) 
  
  return (
    <div className="bg-gradient-to-tl from-[#486c72] to-[#516644]">
      <OpCodeParser 
        answerScript={['OP_ADD', 'OP_3', 'OP_EQUAL']}
        success={success}
        setSuccess={setSuccess} 
      >
        <LessonInfo>
          Hello world
        </LessonInfo>
      </OpCodeParser>
    </div>
  );
}
