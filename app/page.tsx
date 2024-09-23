"use client";

import { useState } from "react";
import Link from "next/link";
import { LessonInfo, OpCodeParser, HeroTitle, Icon } from "ui";
import { SuccessNumbers } from "types";

export default function Home() {
  const [success, setSuccess] = useState<boolean | SuccessNumbers>(0);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-tl from-[#486c72] to-[#516644]">
      <OpCodeParser success={success} setSuccess={setSuccess}>
        <LessonInfo>
          <div className="flex flex-col gap-5 font-nunito md:pt-5">
            <div className="flex flex-row gap-[15px]">
              <HeroTitle />
              <Icon icon="cross" className="flex items-center" />
              <h1 className="text-[24px] font-bold">Bitcoin script</h1>
            </div>
            <div className="text-[22px] font-medium opacity-80">
              <p>
                Welcome to the bitcoin script editor & visualizer. This is your
                playground for learning and experimentation.
              </p>
              <p className="mt-6">Try out some examples:</p>
              <ul className="ml-2.5 list-inside list-disc">
                <li>Basic transaction</li>
                <li>Multi-sig transaction</li>
                <li>Timelocked transaction</li>
              </ul>
              <p className="mt-6">Helpful links:</p>
              <ul className="ml-2.5 list-inside list-disc">
                <li>
                  <Link
                    href="https://learnmeabitcoin.com/technical/script"
                    target="_blank"
                    className="underline"
                  >
                    Introduction to bitcoin script
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://opcodeexplained.com/opcodes"
                    target="_blank"
                    className="underline"
                  >
                    OP_CODE documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://savingsatoshi.com"
                    target="_blank"
                    className="underline"
                  >
                    Learn bitcoin script in Saving Satoshi
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/saving-satoshi/saving-satoshi-script"
                    target="_blank"
                    className="underline"
                  >
                    View the source code & contribute
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </LessonInfo>
      </OpCodeParser>
    </div>
  );
}
